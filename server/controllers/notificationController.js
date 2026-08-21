const Notification = require("../models/Notification");


// Create Notification
const createNotification = async (req, res) => {
    try {
        const {
            userId,
            title,
            message,
            type,
            link
        } = req.body;

        // Check required fields
        if (!userId || !title || !message || !type) {
            return res.status(400).json({
                message: "Please provide all required notification details"
            });
        }

        // Create notification
        const notification = await Notification.create({
            userId,
            title,
            message,
            type,
            link: link || null
        });

        res.status(201).json({
            message: "Notification created successfully",
            notification
        });

    } catch (error) {
        console.error(
            "Create Notification Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get Notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            userId: req.user.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Notifications found successfully",
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.error(
            "Get Notifications Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Mark Notification as Read
const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Find notification
        const notification = await Notification.findById(
            notificationId
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        // Make sure notification belongs to logged-in user
        if (
            notification.userId.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to modify this notification"
            });
        }

        // Mark as read
        notification.isRead = true;

        await notification.save();

        res.status(200).json({
            message: "Notification marked as read",
            notification
        });

    } catch (error) {
        console.error(
            "Mark Notification Read Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createNotification,
    getNotifications,
    markNotificationAsRead
};