// const express = require("express");
import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";
import data from "./data.js";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
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
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
