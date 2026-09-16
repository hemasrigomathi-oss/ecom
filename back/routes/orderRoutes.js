const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save order",
    });
  }
});

module.exports = router;