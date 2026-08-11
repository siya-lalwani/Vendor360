const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        partnershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partnership",
            required: true
        },

        givenBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        communication: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        quality: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        professionalism: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comments: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Feedback = mongoose.model(
    "Feedback",
    feedbackSchema
);

module.exports = Feedback;