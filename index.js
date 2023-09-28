require("dotenv").config();
const app = require("./app");
const connectionDB = require("./db");

const port = process.env.PORT || 4000;

const main = async () => {
  await connectionDB();
  app.listen(port, () => {
    console.log("Server is running");
  });
};

main();
