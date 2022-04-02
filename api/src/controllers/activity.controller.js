const { Activity, Country, Op } = require("../db");

const getActivities = async (req, res) => {
  const activities = await Activity.findAll({
    attributes: ["id", "name"],
  });

  if (!activities)
    return res.status(404).send({
      status: 404,
      msg: "No tourist activities found!",
    });

  return res.send(activities);
};

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countriesName } = req.body;

  if (
    !name ||
    !difficulty ||
    !duration ||
    !season ||
    !countriesName ||
    !countriesName.length
  ) {
    return res.status(400).send({ status: 400, msg: "Bad request" });
  }

  try {
    // validate countries exists
    let countries = [];
    for (let country of countriesName) {
      const found = await Country.findOne({
        where: {
          name: { [Op.iLike]: `${country}` }, // case insensitive
        },
      });
      if (!found) {
        return res.status(400).send({
          status: 400,
          msg: "Bad request",
        });
      }

      countries.push(found);
    }

    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });

    if (!created) {
      return res.status(409).send({
        status: 409,
        msg: "Tourist activity is already exists.",
      });
    }

    await activity.addCountries(countries);

    res.status(201).send({
      status: 201,
      msg: "Tourist activity created succesfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Ups! An error has ocurred." });
  }
};

module.exports = {
  createActivity,
  getActivities,
};
