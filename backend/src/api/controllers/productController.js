// productController
import Product from "../models/Product.js";

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = id && (await Product.findById(id));

        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Finded Successfully!");
        res.status(200).json({ product: findProduct });
    }
    catch (error) {
        // This block will handle errors thrown by Mongoose if the ID format is incorrect
        if (error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid product ID format" });
        }
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    console.log("Returned All Products Successfully!");
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a product
const createProduct = async (req, res) => {
  const { reference, name, description, image, price, category } = req.body;

  try {
    const product = await Product.create({
      reference,
      name,
      description,
      image,
      price,
      category,
    });

    console.log("Created Successfully!");
    res.status(201).json({ product });
  } catch (error) {
    // This block will handle errors thrown by Mongoose if the product reference is not unique
    if (error.message.includes("E11000 duplicate key error")) {
      return res
        .status(400)
        .json({ message: "Product reference must be unique" });
    }
    if (error.message.includes("Category is required.")) {
      return res
        .status(404)
        .json({ message: "Category is required." });
    } 
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a product by ID
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct =
      id &&
      (await Product.findOneAndUpdate(
        { _id: id },
        { ...updateData, updatedAt: Date.now() },
        { new: true }
      ));

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Updated successfully");
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a product by ID
const deleteProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = id && (await Product.findByIdAndDelete(id));
    
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
    
        console.log("Removed Successfully!");
        res.status(200).json({ message: "Removed Successfully!" });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
}

export { getProductById, getAllProducts, createProduct, updateProductById, deleteProductById };
