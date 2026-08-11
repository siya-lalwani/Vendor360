const mongoose = require("mongoose");

const documentRequestSchema = new mongoose.Schema(
    {
        partnershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partnership",
            required: true
        },

        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        requestedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM"
        },

        dueDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "SUBMITTED",
                "APPROVED",
                "REJECTED",
                "CLOSED"
            ],
            default: "PENDING"
        }
    },
    {
        timestamps: true
    }
);

const DocumentRequest = mongoose.model(
    "DocumentRequest",
    documentRequestSchema
);

module.exports = DocumentRequest;