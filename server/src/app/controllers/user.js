const User = require('../models/User');
const asyncHandler = require('express-async-handler');

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
})

module.exports = { register };