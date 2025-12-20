import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/Users';
import { userSchema } from '../types/auth.types';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, password }: z.infer<typeof userSchema> = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            res.status(409).json({
                error: "User already exists"
            });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store to database
        const user = new User({ name, password: hashedPassword });
        await user.save();

        // Response
        res.status(200).json({
            message: "Signed up",
            data: { name }
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, password }: z.infer<typeof userSchema> = req.body;

        // Check if user exists
        const userExists = await User.findOne({ name });
        if (!userExists) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, userExists.password);
        if (!isValidPassword) {
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
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
};