import express from "express"
import mongoose from "mongoose"

import Product from "../models/product.model.js"

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.send(products)
        res.status(200).json({success:true,data:products})
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export const addProducts = async (req, res) => {
    const product = req.body // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all details" })
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(200).json({ success: true, data: newProduct })
        // console.log(res)
    }
    catch (error) {
        console.error('Error in creating product')
        res.status(500).json({ success: false, message: "Server Error" }) //internal server error
    }
}

export const deleteProducts = async (req,res)=>{
    const {id} = req.params
    
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"product deleted"})
    }
    catch(error){
        res.send(404).json({success:false,message:"product not found"})
    }
}

export const updateProducts = async (req,res)=>{
    const {id} = req.params

    const product = req.body;

    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.send(200).json({success:true , message:"product was updated"})
    }
    catch(error)
    {
        res.send(500).json({success:false,message:"product not found"})
    }
}