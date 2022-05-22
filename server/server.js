const server = require("./app");
const conectionToMongo = require("./src/config/mongoConnection");
const { sequelize } = require("./src/models");
const validateEnv = require("./src/utils/validateEnv");

validateEnv();

const { PORT, MONGO_URL } = process.env;

const main = async () => {
  server.listen(PORT, () => {
    //server starting
    console.log(`app listening on port ${PORT}!`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("connected postgres"))
      .catch((err) => {
        console.error("Unable to connect to the posgres:", err);
      });
    //mongoDb connection
    conectionToMongo(MONGO_URL);
  });
};

main();
