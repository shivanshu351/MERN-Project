import express from 'express'
import dotenv from 'dotenv'
import Product from './models/product.model.js'
import connectDB from './config/db.js'
import productRoutes from './routes/product.route.js'

const app = express()

dotenv.config()

app.use(express.json()) // allows us to accept request data in the json data in the req.body



app.use("/api/products",productRoutes)

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000')
})

// 