const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/user');

router.post('/register', userController.register);
router.get('/login', userController.login);


module.exports = router;