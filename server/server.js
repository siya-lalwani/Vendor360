require('dotenv').config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/",(req,res)=>{
    res.send("Vendor360 backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});