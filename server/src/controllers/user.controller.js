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
const updateUser = cathAync(async (req, res) => {
  const { location, email, imageURL, username } = req.body;
  const id = req.user.id;
  console.log(location);
  const { status, response } = await userService.updateUser(id, {
    location,
    email,
    imageURL,
    username,
  });

  res.status(status).send(response);
});
const fetchUser = cathAync(async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  fetchUser,
  updateUser,
};
