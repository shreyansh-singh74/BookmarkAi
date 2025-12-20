import mongoose, { Schema,Document,Model } from 'mongoose';

// Defining the Interface
export interface IUser extends Document{
    name:string,
    password:string
}

// Defining the Schema
const userSchema : Schema<IUser> = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true
    }
});

// export the model
export const User:Model<IUser> = mongoose.model<IUser>('User',userSchema);
