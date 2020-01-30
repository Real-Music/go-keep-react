const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

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
app.use(cors());

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
