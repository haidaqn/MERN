const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//

const createProduct = asyncHandler(async (req, res) => {
    if ( Object.keys(req.body) === 0) throw new Error('Missing input...');
    if (req?.body?.title) req.body.slug = slugify(req.body.title);

    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success : newProduct ? true : false,
        createProduct : newProduct ? newProduct : "Cannot create product"
    });

});

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input");
    const response = await Product.findById(pid);
    return res.status(200).json({
        success: response ? true : false,
        product : response ? response : "Get Product missing"
    })
});

const updateProduct = asyncHandler(async (req, res) => { 
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input");
    
    const response = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        response : response ? response : "No update.."
    });

});

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) throw new Error("Missing input");
    const response = await Product.findByIdAndDelete(pid, req.body, { new: true });
    return res.status(200).json({
            success: response ? true : false,
            response : response ? response : "No delete.."
    });
});

 //
module.exports = {
    createProduct, getProduct,
    updateProduct,deleteProduct
};