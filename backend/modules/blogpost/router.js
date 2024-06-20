// const express = require('express');
// const router = express.Router();
// const controller = require('./controller');

// router.get('/', controller.getAll);
// router.get('/:id', controller.getById);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.remove);

// module.exports = router;

const express = require("express");

const { verifyUser } = require("../authentication/auth.middleware");
const router = express.Router();

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const {
  CreatePost,
  GetPost,
  getSinglePost,
  editPost,
  deletePost,
  getUserPosts,
} = require("./controller");

router
  .route("/create")
  .post(uploadMiddleware.single("file"), CreatePost)
  .get(GetPost);

router
  .route("/create/:id")
  .get(getSinglePost)
  .patch(verifyUser, uploadMiddleware.single("file"), editPost)
  .delete(verifyUser, deletePost);

router.route("/getUserPost/:id").get(getUserPosts);
module.exports = router;