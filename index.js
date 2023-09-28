require("dotenv").config();
const app = require("./app");
const connectionDB = require("./db");
const http = require("http");

const server = http.createServer(app);

const port = process.env.PORT || 4000;

const main = async () => {
  await connectionDB();
  server.listen(port, () => {
    console.log("Server is running");
  });
};

main();
