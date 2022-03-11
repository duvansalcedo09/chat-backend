const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to database
mongoose.connect(config.database, {
  autoIndex: false,
});
// On db connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
// On db error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Force SSL
// app.use(function (req, res, next) {
//   if (!req.secure && req.get("X-Forwarded-Proto") !== "https") {
//     res.redirect(307, "https://" + req.get("Host") + req.url);
//   } else next();
// });

// Set static folder
app.use(express.static(path.join(__dirname, "/public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use API routes
var router = express.Router();
app.use("/api", router);
require("./routes/api/user")(router);
require("./routes/api/contact")(router);
require("./routes/api/message")(router);

// Import other routes and paths
const auth = require("./routes/auth");
app.use("/auth", auth);
app.get("/", (req, res) => {
  res.send("<h1>Exito</h1>");
  console.log("entro");
});
app.get("***", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
