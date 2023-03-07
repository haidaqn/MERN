const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const  { generateAccessToken , generateRefreshToken} = require('../../middlewares/jwt');


//register

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

//login

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
        const userId = response._id;
        const accessToken = generateAccessToken(userId, role); 
        const refreshToken = generateRefreshToken(userId);
        //lưu refresh token vào db
        await User.findByIdAndUpdate(userId, { refreshToken }, { new: true }); // trả về data sau khi update data new
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge : 604800000 // thời gian hết hạn 7 ngày
        })
        return res.status(200).json({
            success: true,
            accessToken,
            userData 
        });
    } else {
        throw new Error("invalid credentials !");
    }

});


const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})

//export

module.exports = { register, login, getCurrent};