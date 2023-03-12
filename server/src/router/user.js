const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const userController = require('../app/controllers/user');
const adminController = require('../app/controllers/admin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/current', verifyAccessToken , userController.getCurrent);
router.post('/refreshToken' , userController.refreshToken);
router.get('/forgotpassword' , userController.forgotPassword);
router.put('/resetpassword', userController.resetPassword);
//

router.put('/current', verifyAccessToken, adminController.updateUser);

// admin
router.get('/',[verifyAccessToken, isAdmin] , adminController.getUser);
router.delete('/',[verifyAccessToken, isAdmin] , adminController.deleteUser);

router.put('/:aid', [verifyAccessToken, isAdmin], adminController.updateByUserAdmin);



module.exports = router;