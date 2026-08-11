const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        vendorName: {
            type: String,
            required: true,
            trim: true
        },

        vendorEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        token: {
            type: String,
            required: true,
            unique: true
        },

        status: {
            type: String,
            required: true,
            enum: ["PENDING", "ACCEPTED", "EXPIRED"]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;