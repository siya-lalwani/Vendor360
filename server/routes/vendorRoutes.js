const express = require("express");
const {createVendor,searchVendors} = require("../controllers/vendorController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
// Create Vendor
router.post("/",protect,createVendor);
// Search Vendors
router.get("/search",protect,searchVendors);
module.exports = router;