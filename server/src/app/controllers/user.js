const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !lastName || !firstName)
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    const user = await User.findOne({ email });
    if (user) throw new Error('User has existed');
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register is successfully!' : 'Something went wrong'
        })
    }
});

const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            success: false,
            message : 'You have entered the wrong email or password...'
        })
    }
    const response = await User.findOne({ email }); // Instance được trả về khi dùng hàm của mongodb
    if (response && await response.isCorrectPassWord(password)) {
    const { password, role, ...userData } = response.toObject();
        return res.status(200).json({
            success: true,
            userData 
        });
    } else {
        throw new Error("invalid credentials !");
    }

});

module.exports = { register, login };