const { createClient } = require("redis");

const redisClient = async () => {
  const client = createClient();
  await client.connect();

  return client;
};

redisClient();

// await client.set("key", "value");
// const value = await client.get("key");
// console.log(value);
// class Redis {
//   client = createClient();

//   constructor() {
//     client.on("error", (err) => console.log("Redis Client Error", err));
//   }
//   set(){

//   }
//   get(){

//   }
// }
module.exports = redisClient;
