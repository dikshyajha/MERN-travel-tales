const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyUser } = require("../authentication/auth.middleware");
router.post('/save', verifyUser, controller.savePost);

router.get('/saved', verifyUser, controller.getSavedPosts);

router.delete('/saved/:postId', verifyUser, controller.removeSavedPost);

module.exports = router;