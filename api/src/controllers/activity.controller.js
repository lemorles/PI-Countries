const { Activity, Country } = require("../db");

const createActivity = async (req, res) => {
  const { name, dificulty, duration, season, countriesId } = req.body;

  if (
    !name ||
    !dificulty ||
    !duration ||
    !season ||
    !countriesId ||
    !countriesId.length
  ) {
    return res.status(400).send({ status: 400, msg: "Bad request" });
  }

  try {
    // validate ids countries exists
    let countries = [];
    for (let id of countriesId) {
      const found = await Country.findByPk(id.toUpperCase());
      if (!found)
        return res.status(400).send({
          status: 400,
          msg: "Bad request",
        });
      countries.push(found);
    }

    const activity = await Activity.create({
      name,
      dificulty,
      duration,
      season,
    });

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
};
