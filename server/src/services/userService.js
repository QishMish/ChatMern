const { throwHttpException } = require("../exception/HttpException");
const { User } = require("../models");

const getUsers = async (userIds, userNames, emails) => {
  if (userIds) {
    return getUsersByField("id", userIds);
  }
  if (userNames) {
    return getUsersByField("username", userNames);
  }
  if (emails) {
    return getUsersByField("email", emails);
  }
  const users = await User.findAll({
    attributes: ["id", "email", "username"],
  });
  return {
    status: 200,
    response: users,
  };
};
const updateUser = async (id, userData) => {
  console.log("first");
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    throwHttpException(404, "User Not Found");
  }
  await User.update(userData, {
    where: {
      id: id,
    },
  });

  return {
    status: 200,
    response: "success",
  };
};
//privite functions
const getUsersByField = async (field, options) => {
  const users = await Promise.all(
    options.map(async (el) => {
      return await User.findOne({
        where: {
          [field]: el,
        },
        attributes: ["id", "email", "username"],
      });
    })
  );
  return {
    status: 200,
    response: users,
  };
};

module.exports = {
  getUsers,
  updateUser,
};
