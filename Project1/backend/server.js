import express from 'express'
import dotenv from 'dotenv'
import Product from './models/product.model.js'
import connectDB from './config/db.js'

const app = express()

dotenv.config()

app.use(express.json()) // allows us to accept request data in the json data in the req.body

app.get('/api/products',async (req,res)=>{
    try{
        const products = await Product.find({});
        res.send(products)
        res.status(200).json({success:true,data:products})
    }
    catch(error)
    {
        res.status(500).json({success:false,message:"internal server error"})
    }
})


app.post('/api/products', async (req, res) => {
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
})

app.delete('/api/products/:id', async (req,res)=>{
    const {id} = req.params
    
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"product deleted"})
    }
    catch(error){
        res.send(404).json({success:false,message:"product not found"})
    }


})

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000')
})

// 