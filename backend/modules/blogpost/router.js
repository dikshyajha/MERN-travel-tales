const express = require("express");
const { verifyUser } = require("../authentication/auth.middleware");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const controller = require('./controller');


router
  .route("/create")
  .post(verifyUser, uploadMiddleware.single("file"), controller.create)
  .get(controller.getAll);

router
  .route("/create/:id")
  .get(controller.getById)
  .patch(verifyUser, uploadMiddleware.single("file"), controller.update)
  .delete(verifyUser, controller.remove);

router.route("/getUserPost/:id").get(controller.getUserPosts);
module.exports = router;