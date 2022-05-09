const { signJwt, verifyJwt } = require("../utils/jwt");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { throwHttpException } = require("../exception/HttpException");
const { json } = require("envalid");

const register = async (email, username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email: email,
    username: username,
    password: hashedPassword,
  });

  const token = await signJwt({ id: user.id });

  const { password: pass, ...others } = user.dataValues;

  return {
    status: 200,
    response: {
      token: token,
      user: others,
    },
  };
};

const login = async (username, password) => {
  console.log("token");
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    throwHttpException(400, "Wrong username or password");
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if (!passwordIsMatch) {
    throwHttpException(400, "Wrong username or password");
  }
  const token = await signJwt({ id: user.id });

  const { password: pass, ...others } = user.dataValues;

  return {
    status: 200,
    response: {
      token: token,
      user: others,
    },
  };
};

module.exports = {
  login,
  register,
};
