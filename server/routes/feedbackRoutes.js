const express = require("express");

const {
    createFeedback,
    getPartnershipFeedback
} = require("../controllers/feedbackController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Submit feedback
router.post(
    "/",
    protect,
    createFeedback
);


// Get feedback for a partnership
router.get(
    "/:partnershipId",
    protect,
    getPartnershipFeedback
);


module.exports = router;