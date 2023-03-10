const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');

const userController = require('../app/controllers/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/current', verifyAccessToken , userController.getCurrent);
router.post('/refreshToken' , userController.refreshToken);
router.get('/forgotpassword' , userController.forgotPassword);
router.put('/resetpassword' , userController.resetPassword);


module.exports = router;