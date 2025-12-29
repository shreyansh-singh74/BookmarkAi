import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from "./config/database"
import authRoutes from './routes/auth.routes';
import bookmarkRoutes from './routes/bookmark.routes'

// Load .env file from the project root (backend directory)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1',bookmarkRoutes)
 

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost/${PORT}`);
});