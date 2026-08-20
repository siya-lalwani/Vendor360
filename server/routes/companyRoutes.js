const express = require("express");
const {createCompany} = require("../controllers/companyController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/",protect,createCompany);
module.exports = router;