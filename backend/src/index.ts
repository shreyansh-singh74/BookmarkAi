import express from 'express';
import {z} from 'zod';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/Users'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Db connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmarkai';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI
).then(()=>{
    console.log("Connected to MongoDB...");
}).catch(err=>{
    console.log("Not Connected to MongoDB...",err);
});

// zod Schema
const userSchema = z.object({
    name : z.string().min(3,'Name is required').max(10),
    password : z.string().min(8,'Minimum 8 length').max(20,'Maximum 20 length')
})

// Endpoint for Signup
app.post('/api/v1/signup',async(req,res)=>{

    const result  = userSchema.safeParse(req.body);
    
    if(!result.success){
        res.status(401).json({
            message: "Error in inputs",
            errors : result.error.format()
        });
        return;
    }
    const { name,password } = result.data;

    // Checking if the user is existing user
    const existingUser = await User.findOne({name});
    if(existingUser){
        res.status(409).json({
            error:"User already exists"
        });
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    // storing to database
    const user = new User({name:name,password:hashedPassword});
    await user.save()

    
    // Response of the request
    res.status(200).json({
        message:"Signed up",
        data:{name:name}
    });
});

app.post('/api/v1/signin',async(req,res)=>{
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        res.status(401).json({
            "error" : result.error
        });
        return;
    }
    const { name,password } = result.data;
    
    // Check if user exists
    const userExists = await User.findOne({name});
    if(!userExists){
        res.status(404).json({
            error: "User not found"
        });
        return;
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, userExists.password);
    if(!isValidPassword){
        res.status(401).json({
            error: "Invalid credentials"
        });
        return;
    }
    
    // Successful signin
    res.status(200).json({
        message: "Signed in successfully",
        data: { name: userExists.name }
    });
})

 

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});