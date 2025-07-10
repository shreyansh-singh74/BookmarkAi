import express from 'express';
import mongoose from 'mongoose';    
import jwt from 'jsonwebtoken';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
