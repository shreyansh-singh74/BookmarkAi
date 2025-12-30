import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const URL = process.env.MONGODB_URI || "";

const connectDB = async () : Promise<void> =>{
    try{
        await mongoose.connect(URL);
        console.log("MongoDB is connected Sucessfully")
    }catch(error){
        console.log("Error is coming: ",error);
    }
}

export default connectDB;