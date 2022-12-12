const mongoose = require("mongoose");
const MONGO_CLUSTER_URL =
  "mongodb+srv://houcem:Hs51882250@pfesearchengine.s8bd1wz.mongodb.net/searchEngine?retryWrites=true&w=majority";

async function connexion() {
  mongoose
    .connect(MONGO_CLUSTER_URL || "")
    .then(() => {
      console.log("Connected to database ...");
    })
    .catch((err) => {
      console.error(`Unable to connect to database : ${err}`);
    });
}
module.exports = connexion;
