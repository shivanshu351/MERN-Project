import mongoose from "mongoose"


 const connectDb = async () => {
    try
    {
        const connectDb = await mongoose.connect(process.env.MONGO_URI)
    }
    catch(error)
    {
        console.log(`Error ${error.message}`);
        process.exit(1);
    }
}

export  default connectDb