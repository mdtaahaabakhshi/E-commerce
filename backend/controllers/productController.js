import express from "express";
import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      price,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = new ProductModel({
      name,
      description,
      category,
      subcategory,
      image: imageUrl,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    });
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
    //   console.log(product)
  } catch (error) {
    // res.status(500).json({ message: "Error adding product",  });
    res.status(500).json({ message: error.message });
  }
};

//remove product
const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);

    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error removing product",
        message: error.message,
      });
  }
};

//list product
const listProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", message: error.message });
  }
};

//single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // const product = await ProductModel.findById(req.body.id);

    const product = await ProductModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
