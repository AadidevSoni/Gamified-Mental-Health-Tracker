//packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' // <-- ADD THIS

//Utiles
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const port = process.env.PORT || 8000;

connectDB();

const app = express();

// CORS middleware – customize origin in production
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.onrender.com'], // Add all allowed origins
  credentials: true
}))

app.use(express.json()); //Handles API requests from frontend that sends or fetches JSON files to be used as JS objects
app.use(express.urlencoded({ extended: true })); //Allows nested objects
app.use(cookieParser()); //Read cookies from HTTP Requests

app.use('/api/users',userRoutes);

app.listen(port, () => console.log("Server running on port " + port));