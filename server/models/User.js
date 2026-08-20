const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },
        organizationType: {
            type: String,
            required: true
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            default: null
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        profileCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User",userSchema);
module.exports = User;