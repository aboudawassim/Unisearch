const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// get password vars from .env file
dotenv.config();

const TOKEN_SECRET =
  "c0c469e611586e560ccca2caa0484258c57ccbbf5d41cc85fad4f95eaeac0d97aa9e4d0ffbb65ad0a63bff87612c57c44c8089b4a84e570061b9463da33ec68d";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  //if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  try {
    const token = jwt.sign(
      { username: username },
      "secret",
      { expiresIn: "24h" },
      TOKEN_SECRET
    );
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
