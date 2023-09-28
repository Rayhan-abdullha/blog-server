require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send({
    status: 200,
    message: "Server is running...",
  });
});

async function connectionDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    server.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}
connectionDB();
