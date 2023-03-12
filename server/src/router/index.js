
// import middleware
const { notFoundPath, errHandler } = require('../middlewares/errHandler');
//
const newUser  = require('./user');
const newProduct  = require('./product');
//
const initRoutes = (app) => {

    app.use('/api/user', newUser);
    app.use('/api/product', newProduct);

    //err path
    app.use(notFoundPath);
    app.use(errHandler); // hứng lỗi 
}

module.exports = initRoutes