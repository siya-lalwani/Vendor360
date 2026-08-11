const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        vendorId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        vendorName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        website: {
            type: String,
            trim: true
        },

        industry: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        logo: {
            type: String,
            default: null
        },

        profileCompleted: {
            type: Boolean,
            default: false
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

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;