const express = require("express");
const mongoose = require("mongoose");
const cardRoutes = require("./Routes/Card.routes");
// const projectRoutes = require("./Routes/ManageProject.routes");
// const userRoutes = require("./Routes/User.routes");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 30001;

//useful while deleting 
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/cards", cardRoutes);
// app.use("/project", projectRoutes);
// app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
