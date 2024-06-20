const express = require('express');
const router = express.Router();
const authController = require('./controller');



router.post('/signin', authController.SignIn);
router.post('/signup', authController.SignUp);


module.exports = router;