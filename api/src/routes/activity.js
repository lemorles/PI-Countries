const { Router } = require("express");
const router = Router();
const { createActivity } = require("../controllers/activity.controller");

// /activity

// create a activity
router.post("/", createActivity);

module.exports = router;
