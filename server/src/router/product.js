const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const productController = require('../app/controllers/product');
//

router.post("/",[verifyAccessToken, isAdmin], productController.createProduct);
router.get("/:pid", productController.getProduct);



router.put("/:pid",[verifyAccessToken, isAdmin],  productController.updateProduct);
router.delete("/:pid",[verifyAccessToken, isAdmin] ,  productController.deleteProduct);


//
module.exports = router;