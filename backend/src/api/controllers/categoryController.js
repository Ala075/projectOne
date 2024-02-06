// categoryController.js
import Category from "../models/Category.js";

// Get a category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = id && (await Category.findById(id));

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Returned Category Successfully!");
    res.status(200).json({ category });
  }
  catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "error.message" });
  }
}

// Get aLL categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    console.log("Returned All Categories Successfully!");
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "error.message" });
  }
};

// Create a category
const createCategory = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const category = await Category.create({
      name,
      description,
      image,
    });

    console.log("Created Successfully!");
    res.status(201).json({ category });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a category by ID
const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCategory =
      id &&
      (await Category.findOneAndUpdate(
        { _id: id },
        { ...updateData, updatedAt: Date.now() },
        {
          new: true,
        }
      ));

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Updated successfully");
    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a category by ID
const deleteCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = id && (await Category.findByIdAndDelete(id));

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Deleted successfully");
    res.status(200).json({ category: deletedCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getCategoryById, getAllCategories, createCategory, updateCategoryById, deleteCategoryById };
