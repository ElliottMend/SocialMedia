const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  cookieParser = require("cookie-parser");
require("dotenv").config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json());

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.SERVER_URL, { useNewUrlParser: true }).then(() => {
  app.use(require("./routes/comments"));
  app.use(require("./routes/follows"));
  app.use(require("./routes/likes"));
  app.use(require("./routes/posts"));
  app.use(require("./routes/user"));
  app.use(require("./routes/userAuth"));
  app.listen(process.env.PORT || 5000);
});
