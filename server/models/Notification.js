const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: [
                "DOCUMENT_REQUEST",
                "DOCUMENT_APPROVED",
                "DOCUMENT_REJECTED",
                "CONTRACT",
                "PARTNERSHIP",
                "INVITATION",
                "DEADLINE",
                "GENERAL"
            ]
        },

        link: {
            type: String,
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;