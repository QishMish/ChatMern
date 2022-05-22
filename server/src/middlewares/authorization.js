const { HttpException } = require("../exception/HttpException");
const { verifyJwt } = require("../utils/jwt");
const { User } = require("../models");

const verifyAuthMiddleware = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    next(new HttpException(400, "Token not found"));
  }
  const decodedToken = await verifyJwt(token, process.env.JWT_SECRET_KEY);

  const user = await User.findOne({
    attributes: ["id", "email", "username", "imageURL", "verified", "location"],
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    next(new HttpException(400, "User does not exist"));
  }
  req.user = user;
  next();
});

module.exports = verifyAuthMiddleware;
