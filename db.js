require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();
async function connectionDB() {
  mongoose.connect(process.env.DB_URL);
  mongoose.set("strictQuery", true);
}

module.exports = connectionDB;
