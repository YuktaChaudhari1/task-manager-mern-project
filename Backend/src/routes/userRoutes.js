const express = require("express");
const userModel = require("../models/user.model");
const {
  registration,
  login,
  profile,
} = require("../controllers/user.controller");

const logout = require("../controllers/logout.controller");
const middleware = require("../middleware/auth.middleware");

const router = express.Router();

//create new user
router.post("/create-user", registration);

router.post("/login", login);

router.get("/profile", middleware, profile);

router.post("/logout", logout);

module.exports = router;
