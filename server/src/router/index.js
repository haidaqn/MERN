
const newUser  = require('./user');

const initRoutes = (app) => {

    
    app.use('/api/user', newUser);

    app.use('/', (req, res) => res.json('hải đăng'));


}

module.exports = initRoutes