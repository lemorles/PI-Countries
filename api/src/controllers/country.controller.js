const { Country, Op } = require("../db");

// get all countries
// example: /countries
const getCountries = async (req, res) => {
  const limit = 9;
  let page = parseInt(req.query.page);

  if (!page || typeof page !== "number" || page < 0) page = 1;

  try {
    // data in db
    const countriesDB = await Country.findAndCountAll({
      attributes: ["id", "name", "flag", "region"],
      offset: page * limit,
      limit,
    });

    if (countriesDB.count) {
      res.send({
        totalPages: Math.ceil(countriesDB.count / limit),
        results: countriesDB.rows,
      });
    }
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
