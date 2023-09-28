require("dotenv").config();
const uri =
  "mongodb+srv://blog-db:Uvwta5vszgr664dY@cluster0.lcnnv.mongodb.net/myBlogDB?retryWrites=true&w=majority";
const mongoose = require("mongoose");
require("dotenv").config();
async function connectionDB() {
  await mongoose.connect(uri);
  mongoose.set("strictQuery", true);
}

module.exports = connectionDB;
