// saleController.js
import Sale from "../models/Sale.js";

// Get a Sale by ID
const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const findSale = id && (await Order.findById(id));

    if (!findSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    console.log("Finded Successfully!");
    res.status(200).json({ Sale: findSale });
  } catch (error) {
    // This block will handle errors thrown by Mongoose if the ID format is incorrect
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid order ID format" });
    }
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all sales
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();

    if (!sales) {
      return res.status(404).json({ message: "No sales found" });
    }

    console.log("Returned All Sales Successfully!");
    res.status(200).json({ sales });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a sale
const createSale = async (req, res) => {
  const { order, total } = req.body;

  if (!order || !total) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const sale = await Sale.create({
      order,
      total,
    });

    console.log("Created Successfully!");
    res.status(201).json({ sale });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getSaleById, getAllSales, createSale };
