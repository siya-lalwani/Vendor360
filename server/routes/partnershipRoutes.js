const express = require("express");
const {createPartnershipRequest, acceptPartnershipRequest,rejectPartnershipRequest} = require("../controllers/partnershipController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Company sends a connection request to a vendor
router.post("/",protect,createPartnershipRequest);
// Vendor accepts partnership request
router.patch("/:partnershipId/accept",protect,acceptPartnershipRequest);
router.patch(
    "/:partnershipId/reject",
    protect,
    rejectPartnershipRequest
);
module.exports = router;