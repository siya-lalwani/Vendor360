const Feedback = require("../models/Feedback");
const Partnership = require("../models/Partnership");


// Create Feedback
const createFeedback = async (req, res) => {
    try {
        const {
            partnershipId,
            rating,
            communication,
            quality,
            professionalism,
            comments
        } = req.body;

        // Check required fields
        if (
            !partnershipId ||
            rating === undefined ||
            communication === undefined ||
            quality === undefined ||
            professionalism === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all required feedback details"
            });
        }

        // Find partnership
        const partnership = await Partnership.findOne({
            partnershipId
        });

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Feedback can only be given for an active partnership
        if (partnership.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Feedback can only be given for active partnerships"
            });
        }

        // Validate rating values
        if (
            rating < 1 || rating > 5 ||
            communication < 1 || communication > 5 ||
            quality < 1 || quality > 5 ||
            professionalism < 1 || professionalism > 5
        ) {
            return res.status(400).json({
                message: "Ratings must be between 1 and 5"
            });
        }

        // Create feedback
        const feedback = await Feedback.create({
            partnershipId: partnership._id,
            givenBy: req.user.userId,
            rating,
            communication,
            quality,
            professionalism,
            comments
        });

        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        });

    } catch (error) {
        console.error(
            "Create Feedback Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get Feedback for a Partnership
const getPartnershipFeedback = async (req, res) => {
    try {
        const { partnershipId } = req.params;

        // Find partnership
        const partnership = await Partnership.findOne({
            partnershipId
        });

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Get feedback
        const feedback = await Feedback.find({
            partnershipId: partnership._id
        })
            .populate(
                "givenBy",
                "name email role organizationType"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            message: "Feedback found successfully",
            count: feedback.length,
            feedback
        });

    } catch (error) {
        console.error(
            "Get Feedback Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createFeedback,
    getPartnershipFeedback
};