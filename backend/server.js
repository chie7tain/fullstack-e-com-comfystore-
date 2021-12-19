// const express = require("express");
import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import data from "./data.js";
import config from "./config.js";
console.log(config);
console.log("hello", mongoose.connect(config.MONGODB_URL));

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.reason));

app.use(cors());
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
