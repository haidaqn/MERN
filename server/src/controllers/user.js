const expressHandler = require('express-async-handler');
const User = require('../models/User');

const newUser = expressHandler(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body; 
    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing !"
        })
    }
    const response = await new User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        mes : "Successfully!"
    })

})

const get = (req, res, next) => {
    res.json("hải đăng");
}

module.export = {
    newUser , get
}