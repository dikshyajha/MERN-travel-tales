const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyUser, verifyAdmin } = require('../authentication/auth.middleware');

router.get('/users', verifyUser, verifyAdmin, controller.getAllUsers);

module.exports = router;
