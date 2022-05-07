const cathAync = require("../utils/catchAsync");
const authService = require("../services/authService");

const register = cathAync(async (req, res) => {
  const { email, username, password } = req.body;
  const { status, response } = await authService.register(
    email,
    username,
    password
  );
  res.status(status).send(response);
});
const login = cathAync(async (req, res) => {
  const { username, password } = req.body;
  const { status, response } = await authService.login(username, password);
  res.status(status).send(response);
});

module.exports = {
  login,
  register,
};
