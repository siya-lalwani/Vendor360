const express = require("express");

const {
    createActivityLog,
    getActivityLogs
} = require("../controllers/activityLogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Create activity log
router.post(
    "/",
    protect,
    createActivityLog
);


// Get activity logs for a partnership
router.get(
    "/:partnershipId",
    protect,
    getActivityLogs
);


module.exports = router;