const Company = require("../models/Company");
const createCompany = async (req, res) => {
    try {
        const {
            companyId,
            companyName,
            email,
            phone,
            website,
            industry,
            address,
            city,
            state,
            country,
            description,
            logo
        } = req.body;

        // check required fields
        if (!companyId ||
            !companyName ||
            !email ||
            !phone ||
            !industry ||
            !address ||
            !city ||
            !state ||
            !country) {
            return res.status(400).json({
                message: "Please provide all required company details"
            });
        }

        // Check whether company ID already exists
        const existingCompany = await Company.findOne({ companyId });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company ID already exists"
            });
        }

        // Check whether company email already exists
        const existingEmail = await Company.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Company email already exists"
            });
        }

        // Create company
        const company = await Company.create({
            companyId,
            companyName,
            email,
            phone,
            website,
            industry,
            address,
            city,
            state,
            country,
            description,
            logo,
            createdBy: req.user.userId
        });
        res.status(201).json({
            message: "Company profile created successfully",
            company
        });
    } catch (error) {
        console.error("Create Company Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = { createCompany };