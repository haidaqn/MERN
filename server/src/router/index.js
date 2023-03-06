
// import middleware
const { notFoundPath, errHandler } = require('../middlewares/errHandler');
//
const newUser  = require('./user');
//
const initRoutes = (app) => {

    app.use('/api/user', newUser);
    app.use('/', (req, res) => res.json('hải đăng'));



    //err path
    app.use(notFoundPath);
    app.use(errHandler); // hứng lỗi 
}

module.exports = initRoutes