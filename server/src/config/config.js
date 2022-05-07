require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, NODE_ENV } = process.env;
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "chat",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "chat",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
