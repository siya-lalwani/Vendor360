const express = require("express");

const {
    createContract,
    activateContract,
    getContracts,
    getContractByNumber,
    terminateContract
} = require("../controllers/contractController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create contract
router.post(
    "/",
    protect,
    createContract
);

// Get all contracts
router.get(
    "/",
    protect,
    getContracts
);

// Get contract by contract number
router.get(
    "/:contractNumber",
    protect,
    getContractByNumber
);

// Activate contract
router.patch(
    "/:contractNumber/activate",
    protect,
    activateContract
);

// Terminate contract
router.patch(
    "/:contractNumber/terminate",
    protect,
    terminateContract
);

module.exports = router;