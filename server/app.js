const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const indexRoutes = require("./src/routes");
const globalExceptionHandler = require("./src/middlewares/globalExceptionHandler");
const app = express();
const http = require("http");
const socket = require("./socket");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

socket(server);



app.use(cors());
app.use(indexRoutes);
app.use(globalExceptionHandler);
app.use("*", (req, res) => {
  res.json({ error: "route does not exist" });
});

// app.get("/", (req, res) => res.send("Hello World!"));

module.exports = server;
