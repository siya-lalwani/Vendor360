const express = require("express");

const {
    createNotification,
    getNotifications,
    markNotificationAsRead
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Create notification
router.post(
    "/",
    protect,
    createNotification
);


// Get logged-in user's notifications
router.get(
    "/",
    protect,
    getNotifications
);


// Mark notification as read
router.patch(
    "/:notificationId/read",
    protect,
    markNotificationAsRead
);


module.exports = router;