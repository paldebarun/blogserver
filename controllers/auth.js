require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing in the request headers",
      });
    }

   
    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const tokenValue = token.replace("Bearer ", "");

    try {
      const payload = jwt.verify(tokenValue, process.env.JWT_SECRET);
      console.log(payload);
      payload.password=undefined;

      return res.status(200).json({
        success: true,
        message: "The user is verified",
        payload: payload,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
