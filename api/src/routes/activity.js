const { Router } = require("express");
const router = Router();
const {
  createActivity,
  getActivities,
} = require("../controllers/activity.controller");

// /activity

// create a activity
router.post("/", createActivity);

// get all activities
router.get("/", getActivities);

module.exports = router;
