const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/database'); // Database connection
const router = require('./routes/index'); // Import consolidated routes

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", router); // Prefix all routes with '/api'

// Port Configuration
const PORT = process.env.PORT || 8080;

// Database Connection and Server Start
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Connected to the database.`);
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to the database:", err.message);
        process.exit(1); // Exit with failure code
    });