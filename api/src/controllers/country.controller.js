const { Country, Activity, Op } = require("../db");

const getCountries = async (req, res) => {
  const { name, region, activity } = req.query;

  // filters
  let filters = {};
  // /countries?name=chi
  if (name) filters.name = { [Op.iLike]: `%${name}%` };

  // /countries?region=americas
  if (region) filters.region = { [Op.iLike]: `%${region}%` };

  try {
    const countries = await Country.findAndCountAll({
      attributes: ["id", "name", "flag", "region", "population"],
      include: [
        {
          model: Activity,
          attributes: ["id", "name"],
          where: activity ? { name: activity } : null,
        },
      ],
      where: Object.keys(filters).length ? filters : null,
    });

    if (countries.count === 0) {
      return res
        .status(404)
        .send({ status: 404, msg: "The country does not exists." });
    }

    res.send(countries.rows);
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

    res.send(country);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Ups! An error has ocurred." });
  }
};

// get a various country
// example: /countries?name=chi
// const getCountriesByName = async (req, res, next) => {
//   const { name } = req.query;

//   if (!name) return next();

//   try {
//     const countries = await Country.findAll({
//       attributes: ["id", "name", "flag", "region"],
//       where: {
//         name: { [Op.iLike]: `%${name}%` },
//       },
//       include: [
//         {
//           model: Activity,
//           attributes: ["id", "name"],
//         },
//       ],
//     });

//     if (!countries.length) {
//       return res
//         .status(404)
//         .send({ status: 404, msg: "The country does not exists." });
//     }

//     res.send(countries);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: "Ups! An error has ocurred." });
//   }
// };

module.exports = {
  getCountries,
  getCountryById,
  // getCountriesByName,
};
