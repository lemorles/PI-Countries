const { Router } = require("express");
const router = Router();
const {
  getCountries,
  getCountryById,
} = require("../controllers/country.controller");

// /countries

// get all countries
router.get("/", getCountries);

// get one country
router.get("/:id", getCountryById);

module.exports = router;
