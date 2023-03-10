const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const  { generateAccessToken , generateRefreshToken} = require('../../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../../util/sendMail');
const crypto = require('crypto');


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
        const accessToken = generateAccessToken(userId, role); // taoj access
        const refreshToken = generateRefreshToken(userId); // tao refresh
        //lưu refresh token vào db
        await User.findByIdAndUpdate(userId, { refreshToken }, { new: true }); // trả về data new sau khi update data
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
//logout
const logout = asyncHandler(async (req,res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error("No refresh token..."); // ktra đăng nhập
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken },
        { refreshToken: '' }, { new: true });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    return res.status(200).json({
        success: true,
        mes : ' logout is done'
    })

})
const getCurrent = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // console.log(userId);

    const user = await User.findById( userId ).select('-refreshToken -password -role')

    // console.log(user);

    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})
const refreshToken = asyncHandler(async (req, res) => { 
     // Lấy token từ cookies
    const cookie = req.cookies
    // Check xem có token hay không
    // console.log(cookie);
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({ _id: rs.id , refreshToken: cookie.refreshToken})
    // console.log(rs);
    // console.log(response);
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response.id, response.role) : 'Refresh token not matched'
    })

})
//
// reset pw
/* 
    client -> mail -> check mail -> gui link 
           -> click link -> api token -> check api token 
           -> change pw
*/

const forgotPassword = asyncHandler(async (req,res) => {
    const { email } = req.query;  
    if (!email) throw new Error("No email");
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user");
    const resetToken = user.createPasswordChangedToken();
    await user.save(); // luu resettoken vao db ...
    //
    
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
                <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }

    const response = await sendMail(data);

    // console.log(response);

    return res.status(200).json({
        success: true, 
        response
    });

})


const resetPassword = asyncHandler(async (req,res) => {
    const { password, token } = req.body;
    if (!password || !token) throw new Error("missing inputs");
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken , passwordResetExpires :{$gt: Date.now()}});

    if (!user) throw new Error('Invalid reset token');
    user.password = password;
    user.passwordResetExpires = Date.now();
    user.passwordResetToken = undefined;
    user.passwordChangedAt = undefined;

    await user.save();

    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    });

})


//export

module.exports = {
    register, login,
    logout, getCurrent,
    refreshToken, forgotPassword,
    resetPassword
};