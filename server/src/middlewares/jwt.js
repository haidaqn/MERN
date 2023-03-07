const jwt = require('jsonwebtoken');

//

//accessToken
const generateAccessToken = (userId, role) =>
    jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '3d' });

// refresh token
const generateRefreshToken = (userId) =>
    jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: '7d' });


module.exports = { generateAccessToken, generateRefreshToken };