const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
    {
        partnershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partnership",
            required: true
        },

        contractNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            required: true,
            trim: true,
            default: "INR"
        },

        employeeCount: {
            type: Number,
            required: true,
            min: 0
        },

        productCount: {
            type: Number,
            required: true,
            min: 0
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: [
                "DRAFT",
                "ACTIVE",
                "EXPIRED",
                "TERMINATED"
            ],
            default: "DRAFT"
        },

        contractFile: {
            type: String,
            default: null
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;