import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils";

import Order from "../models/orderModels";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res
      .status(201)
      .send({ message: "Order placed successfully", order: createdOrder });
  })
);
export default orderRouter;
