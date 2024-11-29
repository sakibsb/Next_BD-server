const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/database');
const router = require('./routes/index'); // Explicitly pointing to the index file in the routes folder

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Fallback for development
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", router);

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
        process.exit(1); // Exit process with failure code
    });
