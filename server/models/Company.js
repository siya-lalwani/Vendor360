const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
    {
        companyId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        companyName: {
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
const Company = mongoose.model("Company",companySchema);
module.exports = Company;