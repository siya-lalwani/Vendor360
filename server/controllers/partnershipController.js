const Partnership = require("../models/Partnership");
const Vendor = require("../models/Vendor");
const Company = require("../models/Company");

const createPartnershipRequest = async (req, res) => {
    try {
        const { vendorId } = req.body;

        // check whether Vendor ID was provided
        if (!vendorId) {
            return res.status(400).json({
                message: "Please provide a vendor ID"
            });
        }

        // Find the authenticated company user
        const company = await Company.findOne({
            createdBy: req.user.userId
        });
        if (!company) {
            return res.status(404).json({
                message: "Company profile not found"
            });
        }

        // Find the vendor using the Vendor360 business ID
        const vendor = await Vendor.findOne({
            vendorId
        });
        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            });
        }

        // Check whether a partnership already exists
        const existingPartnership = await Partnership.findOne({
            companyId: company._id,
            vendorId: vendor._id,
            status: {
                $in: ["PENDING", "ACTIVE"]
            }
        });
        if (existingPartnership) {
            return res.status(400).json({
                message: "A pending or active partnership already exists"
            });
        }

        // Generate Partnership ID
        const partnershipCount = await Partnership.countDocuments();
        const partnershipId = `PART-${String(
            partnershipCount + 1
        ).padStart(6, "0")}`;

        // Create partnership request
        const partnership = await Partnership.create({
            partnershipId,
            companyId: company._id,
            vendorId: vendor._id,
            status: "PENDING",
            createdBy: req.user.userId
        });
        res.status(201).json({
            message: "Partnership request sent successfully",
            partnership
        });
    } catch (error) {
        console.error(
            "Create Partnership Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Accept Partnership Request
const acceptPartnershipRequest = async (req, res) => {
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

        // Partnership must still be pending
        if (partnership.status !== "PENDING") {
            return res.status(400).json({
                message: "Only pending partnership requests can be accepted"
            });
        }

        // Find the vendor connected to this partnerhsip
        const vendor = await Vendor.findById(
            partnership.vendorId
        );
        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            });
        }

        // Verify that the logged-in user owns the vendor
        if (vendor.createdBy.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to accept this partnership"
            });
        }

        // Activate partnership
        partnership.status = "ACTIVE";
        partnership.startedOn = new Date();
        await partnership.save();
        res.status(200).json({
            message: "Partnership accepted successfully",
            partnership
        });
    } catch (error) {
        console.error(
            "Accept Partnership Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Reject Partnership Request
const rejectPartnershipRequest = async (req, res) => {
    try {
        const { partnershipId } = req.params;

        // Find partnerhsip
        const partnership = await Partnership.findOne({
            partnershipId
        });
        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Partnership must still be pending
        if (partnership.status !== "PENDING") {
            return res.status(400).json({
                message: "Only pending partnership requests can be rejected"
            });
        }

        // Find the vendor connected to this partnership
        const vendor = await Vendor.findById(
            partnership.vendorId
        );
        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            });
        }

        // Verify that the logged-in user owns the vendor
        if (
            vendor.createdBy.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to reject this partnership"
            });
        }

        // Reject partnership
        partnership.status = "REJECTED";
        await partnership.save();
        res.status(200).json({
            message: "Partnership rejected successfully",
            partnership
        });
    } catch (error) {
        console.error(
            "Reject Partnership Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createPartnershipRequest,
    acceptPartnershipRequest,
    rejectPartnershipRequest
};