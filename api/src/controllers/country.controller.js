const axios = require("axios");
require("dotenv").config();
const { BASEURL_API } = process.env;
const { Country, Capital, Op } = require("../db");

// get all countries
// example: /countries
const getCountries = async (req, res) => {
  try {
    // data in db
    const countriesDB = await Country.findAll({
      attributes: ["id", "name", "flag", "region"],
    });
    if (countriesDB.length) return res.json(countriesDB);

    // data in api of rest countries
    const response = await axios.get(`${BASEURL_API}/all`);
    const countriesAPI = await Promise.all(
      response.data.map(async (country) => {
        await Country.create({
          id: country.cca3,
          name: country.name.common,
          flag: country.flags[0],
          region: country.region,
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        });

        let capital;
        if (!country.capital) {
          capital = "none";
          await Capital.create({ name: capital, countryId: country.cca3 });
        }
        if (country.capital && country.capital.length === 1) {
          capital = country.capital[0];
          await Capital.create({ name: capital, countryId: country.cca3 });
        }
        if (country.capital && country.capital.length > 1) {
          for (let capital of country.capital) {
            await Capital.create({ name: capital, countryId: country.cca3 });
          }
        }

        return {
          id: country.cca3,
          name: country.name.common,
          flag: country.flags[0],
          region: country.region,
        };
      })
    );

    res.json(countriesAPI);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Ups! An error has ocurred." });
  }
};

// get one country
// example: /countries/ARG
const getCountryById = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByPk(id.toUpperCase(), {
      include: ["activities", "capitals"],
    });

    if (!country)
      return res.status(404).send({
        status: 404,
        msg: "The country does not exist.",
      });

    res.json(country);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Ups! An error has ocurred." });
  }
};

// get a various country
// example: /countries?name=chi
const getCountriesByName = async (req, res, next) => {
  const { name } = req.query;

  if (!name) return next();

  try {
    const countries = await Country.findAll({
      attributes: ["id", "name", "flag", "region"],
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    res.json(countries);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Ups! An error has ocurred." });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  getCountriesByName,
};
