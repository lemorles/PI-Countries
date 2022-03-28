const { Router } = require("express");
const router = Router();
const {
  getCountries,
  getCountryById,
  getCountriesByName,
} = require("../controllers/country.controller");

// /countries

// get a various country
router.get("/", getCountriesByName);

// get all countries
router.get("/", getCountries);

// get one country
router.get("/:id", getCountryById);

module.exports = router;
