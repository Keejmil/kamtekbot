const mongoose = require("mongoose");
const config = require('./config.json')

module.exports = (client, Discord) => {
  mongoose
    .connect(
      config.mongo_path,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Połączono z bazą danych");
    })
    .catch((err) => {
      console.log(err);
    });
};
