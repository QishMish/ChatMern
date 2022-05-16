const cathAync = require("../utils/catchAsync");
const userService = require("../services/userService");

const getUsers = cathAync(async (req, res) => {
  const { userIds, userNames, emails } = req.body;

  const { status, response } = await userService.getUsers(
    userIds,
    userNames,
    emails
  );

  res.status(status).send(response);
});

const fetchUser = cathAync(async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  fetchUser,
};
