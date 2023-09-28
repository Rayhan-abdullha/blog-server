require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");

const port = process.env.PORT || 5000;

async function connectionDB() {
  try {
    mongoose.connect(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}
connectionDB();
