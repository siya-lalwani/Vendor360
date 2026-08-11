const mongoose = require("mongoose");

const partnershipSchema = new mongoose.Schema(
    {
        partnershipId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: [
                "PENDING",
                "ACTIVE",
                "REJECTED",
                "TERMINATED"
            ],
            default: "PENDING"
        },

        startedOn: {
            type: Date,
            default: null
        },

        endedOn: {
            type: Date,
            default: null
        },

        currentContractId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract",
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

const Partnership = mongoose.model(
    "Partnership",
    partnershipSchema
);

module.exports = Partnership;