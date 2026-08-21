require('dotenv').config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const partnershipRoutes = require("./routes/partnershipRoutes");
const contractRoutes = require("./routes/contractRoutes");
const documentRoutes = require("./routes/documentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/partnerships", partnershipRoutes);
app.use("/api/contracts",contractRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/",(req,res)=>{
    res.send("Vendor360 backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});