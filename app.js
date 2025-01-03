const express = require("express");
require("dotenv").config();
// db connection
const dbconnection = require("./db/dbConfig");
const app = express();
const cors = require("cors");
const port = 3004;

// user routes middleware file
const useRoutes = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

app.use(cors((origins = ["http://localhost:5173"])));

// Add a route for `/` to avoid "Cannot GET /" errors
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// json middleware to extract json data
app.use(express.json());
// user routes middleware
app.use("/api/users", useRoutes);

app.use("/api", questionRoute);
app.use("/api", answerRoute);

// questions routes middleware ??

// answers routes middleware ??

async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ");
    // const [result] = await dbconnection.query("SELECT 'test' AS result");

    console.log(result);
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
