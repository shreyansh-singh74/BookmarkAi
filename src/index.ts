import express from 'express';
import {z} from 'zod';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/Users'

const app = express();
app.use(express.json());

// Db connection
mongoose.connect('mongodb+srv://admin:123sujalsingh@cluster0.ky93nr4.mongodb.net/'
).then(()=>{
    console.log("Connected...")
}).catch(err=>{
    console.log("Not Connected...",err);
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
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    // storing to database
    const user = new User({name:name,password:hashedPassword});
    await user.save()

    
    // Response of the request
    res.status(200).json({
        message:"Signed up",
        data:{name:password}
    });
});

app.post('/api/v1/signin',async(req,res)=>{
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        res.status(401).json({
            "error" : result.error
        });
    }
    const { name,password } = result.data;
    const userExists = User.findOne()
})

 

app.listen(3000,()=>{
    console.log("Sever is running");
});