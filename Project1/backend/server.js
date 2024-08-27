import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()


app.post('/products',(req,res)=>{
    
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})

// 