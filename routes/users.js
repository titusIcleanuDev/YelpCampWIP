const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const { application } = require("express");
const passport = require("passport");
const usersController = require("../controllers/usersController");

router.route("/register").get(usersController.renderRegister).post(catchAsync(usersController.register));

router
  .route("/login")
  .get(usersController.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersController.login
  );

router.get("/logout", usersController.logout);

module.exports = router;
