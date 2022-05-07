const jwt = require("jsonwebtoken");

const signJwt = async (payload, secret) => {
  var token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const verifyJwt = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (e) {
    return null;
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
