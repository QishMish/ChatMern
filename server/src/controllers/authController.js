const cathAync = require("../utils/catchAsync");
const authService = require("../services/authService");

const register = cathAync(async (req, res) => {
  const { email, username, password } = req.body;
  const { status, response } = await authService.register(
    email,
    username,
    password
  );
  setTokenToCookie(res, response.token);
  res.status(status).send(response);
});
const login = cathAync(async (req, res) => {
  const { username, password } = req.body;
  const { status, response } = await authService.login(username, password);
  setTokenToCookie(res, response.token);
  res.status(status).send(response);
});

module.exports = {
  login,
  register,
};

const setTokenToCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
};
