import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add a new product
export const addProducts = async (req, res) => {
  const { name, price, image } = req.body;

  // Input validation
  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "Please provide all product details" });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a product by ID
export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a product by ID
export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
