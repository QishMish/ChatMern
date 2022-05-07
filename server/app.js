const express = require("express");
const dotenv = require("dotenv");
const indexRoutes = require("./src/routes");
const globalExceptionHandler = require("./src/middlewares/globalExceptionHandler");

const app = express();

dotenv.config();
app.use(express.json());

app.use(indexRoutes);
app.use(globalExceptionHandler);

// app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
