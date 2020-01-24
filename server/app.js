const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

/** Routes */
const userRoutes = require(__dirname + "/api/routes/users");
const noteRoutes = require(__dirname + "/api/routes/notes");
const labelRoutes = require(__dirname + "/api/routes/labels");

/** Static Folder */
app.use(express.static(__dirname + "/public"));

/** Middle Ware */
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Handling Cors */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }

  next();
});

/** Routes */
app.use(userRoutes);
app.use("/notes", noteRoutes);
app.use("/labels", labelRoutes);

// Erro Handling
app.use("*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
