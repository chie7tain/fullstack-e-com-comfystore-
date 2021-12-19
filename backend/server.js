// const express = require("express");
import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";
import data from "./data.js";

app.use(cors());
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
