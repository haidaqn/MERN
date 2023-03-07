const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');

const userController = require('../app/controllers/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current',verifyAccessToken , userController.getCurrent);


module.exports = router;