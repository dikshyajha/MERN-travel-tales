const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyUser } = require("../authentication/auth.middleware");
router.get('/', verifyUser, controller.getAll);

router.get('/:id', verifyUser, controller.getById);

router.post('/', verifyUser, controller.create);

router.put('/:id', verifyUser, controller.update);

router.delete('/:id', verifyUser, controller.remove);
module.exports = router;
