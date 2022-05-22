const jwt = require("jsonwebtoken");


const signJwt = async ({id, secret}) => {
  var token = await jwt.sign({id}, secret, {
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
