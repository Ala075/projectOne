// orderController.js
import Order from "../models/Order.js";

// Get a order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const findOrder = id && (await Order.findById(id));

    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Finded Successfully!");
    res.status(200).json({ order: findOrder });
  } catch (error) {
    // This block will handle errors thrown by Mongoose if the ID format is incorrect
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid order ID format" });
    }
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    console.log("Returned All Orders Successfully!");
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "error.message" });
  }
};

// Create a order
const createOrder = async (req, res) => {
  const { reference, customer, products, total } = req.body;

  if (!reference || !customer || !products) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const order = await Order.create({
      reference,
      customer,
      products,
      total,
    });

    console.log("Created Successfully!");
    res.status(201).json({ order });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "error.message" });
  }
};

// update a order by ID
const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (
    !updateData.reference ||
    !updateData.customer ||
    !updateData.products ||
    !updateData.total
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const findOrder = id && (await Order.findById(id));

    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (findOrder.expiredAt < Date.now()) {
      await Order.findOneAndUpdate(
        { _id: id },
        { status: "expired", updatedAt: Date.now() },
      );
      return res.status(404).json({ message: "Order can't been modified" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { ...updateData, updatedAt: Date.now() },
      {
        new: true,
      }
    );

    console.log("Updated successfully");
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a order by ID
const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const findOrder = id && (await Order.findById(id));

    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (findOrder.expiredAt < Date.now()) {
      return res.status(404).json({ message: "Order can't been deleted" });
    }

    const deletedOrder = id && (await Order.findByIdAndDelete(id));

    console.log("Deleted successfully");
    res.status(200).json({ order: deletedOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getOrderById,
  getAllOrders,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
