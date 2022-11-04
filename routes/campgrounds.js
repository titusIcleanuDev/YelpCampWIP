const express = require("express");
const router = express.Router();
const campgroundsController = require("../controllers/campgroundsController");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgroundsController.index))
  //post(isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("It worked!");
  });

router.get("/new", isLoggedIn, campgroundsController.renderNewForm);
router
  .route("/:id")
  .get(catchAsync(campgroundsController.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditForm));

module.exports = router;
