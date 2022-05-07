const mongoose = require("mongoose");

const conectionToMongo = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true,
      // useFindAndModify:false
    })
    .then(() => console.log("connected mongodb"))
    .catch((err) => {
      console.error("Unable to connect to the mongoDb:", err);
    });
};
module.exports = conectionToMongo;
