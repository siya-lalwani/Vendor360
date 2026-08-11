const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        partnershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partnership",
            required: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        action: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const ActivityLog = mongoose.model(
    "ActivityLog",
    activityLogSchema
);

module.exports = ActivityLog;