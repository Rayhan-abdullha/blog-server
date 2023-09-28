const mongoose = require("mongoose");
require("dotenv").config();
async function connectionDB() {
  mongoose.connect(process.env.DB_URL);
}
module.exports = connectionDB;
