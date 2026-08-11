const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        documentRequestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DocumentRequest",
            required: true
        },

        partnershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partnership",
            required: true
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        originalFileName: {
            type: String,
            required: true,
            trim: true
        },

        storedFileName: {
            type: String,
            required: true,
            trim: true
        },

        mimeType: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        },

        fileUrl: {
            type: String,
            required: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;