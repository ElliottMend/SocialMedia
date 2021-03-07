export {};
import { Request, Response, NextFunction } from "express";
const express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser"),
  { Pool } = require("pg");
require("dotenv").config();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});
export const pool = new Pool({
  host: "localhost",
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(require("./routes/comments"));
app.use(require("./routes/follows"));
app.use(require("./routes/likes"));
app.use(require("./routes/posts"));
app.use(require("./routes/user"));
app.use(require("./routes/userAuth"));
app.listen(process.env.PORT || 5000);
