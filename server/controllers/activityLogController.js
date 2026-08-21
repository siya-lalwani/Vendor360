const ActivityLog = require("../models/ActivityLog");


// Create Activity Log
const createActivityLog = async (req, res) => {
    try {
        const {
            partnershipId,
            action,
            description
        } = req.body;

        // Check required fields
        if (!partnershipId || !action) {
            return res.status(400).json({
                message: "Please provide all required activity log details"
            });
        }

        // Create activity log
        const activityLog = await ActivityLog.create({
            partnershipId,
            performedBy: req.user.userId,
            action,
            description
        });

        res.status(201).json({
            message: "Activity log created successfully",
            activityLog
        });

    } catch (error) {
        console.error(
            "Create Activity Log Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get Activity Logs
const getActivityLogs = async (req, res) => {
    try {
        const { partnershipId } = req.params;

        const activityLogs = await ActivityLog.find({
            partnershipId
        })
            .populate(
                "performedBy",
                "name email role organizationType"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            message: "Activity logs found successfully",
            count: activityLogs.length,
            activityLogs
        });

    } catch (error) {
        console.error(
            "Get Activity Logs Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createActivityLog,
    getActivityLogs
};