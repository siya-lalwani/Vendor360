const Contract = require("../models/Contract");
const Partnership = require("../models/Partnership");
const Company = require("../models/Company");

const createContract = async (req, res) => {
    try {
        const {
            partnershipId,
            title,
            amount,
            currency,
            employeeCount,
            productCount,
            startDate,
            endDate,
            contractFile
        } = req.body;

        // Check required fields
        if (!partnershipId ||
            !title ||
            amount === undefined ||
            employeeCount === undefined ||
            productCount === undefined ||
            !startDate ||
            !endDate){
            return res.status(400).json({
                message: "Please provide all required contract details"
            });
        }

        // Only Company users can create contracts
        if (req.user.organizationType !== "COMPANY") {
            return res.status(403).json({
                message: "Only company users can create contracts"
            });
        }

        // Find the partnership
        const partnership = await Partnership.findOne({
            partnershipId
        });
        if(!partnership){
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Contract can only be created for an active partnership
        if(partnership.status !== "ACTIVE"){
            return res.status(400).json({
                message: "Contracts can only be created for active partnerships"
            });
        }

        // Find the company
        const company = await Company.findById(
            partnership.companyId
        );
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        // Check whether an active contract already exists
        if (partnership.currentContractId) {
            return res.status(400).json({
                message: "This partnership already has an active contract"
            });
        }

        // Generate Contract Number
        const contractCount = await Contract.countDocuments();

        const contractNumber = `CONT-${String(
            contractCount + 1
        ).padStart(6, "0")}`;

        // Create Contract
        const contract = await Contract.create({
            partnershipId: partnership._id,
            contractNumber,
            title,
            amount,
            currency: currency || "INR",
            employeeCount,
            productCount,
            startDate,
            endDate,
            status: "DRAFT",
            contractFile: contractFile || null,
            createdBy: req.user.userId
        });
        res.status(201).json({
            message: "Contract created successfully",
            contract
        });
    }catch (error) {
        console.error(
            "Create Contract Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
const activateContract = async (req, res) => {
    try {
        const { contractNumber } = req.params;

        // Find contract
        const contract = await Contract.findOne({
            contractNumber
        });

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }

        // Contract must be in DRAFT status
        if (contract.status !== "DRAFT") {
            return res.status(400).json({
                message: "Only draft contracts can be activated"
            });
        }

        // Find the partnership
        const partnership = await Partnership.findById(
            contract.partnershipId
        );

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Partnership must be active
        if (partnership.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Contract can only be activated for an active partnership"
            });
        }

        // Check whether another active contract already exists
        if (partnership.currentContractId) {
            return res.status(400).json({
                message: "This partnership already has an active contract"
            });
        }

        // Activate contract
        contract.status = "ACTIVE";
        await contract.save();

        // Set this contract as the current contract
        partnership.currentContractId = contract._id;
        await partnership.save();

        res.status(200).json({
            message: "Contract activated successfully",
            contract
        });

    } catch (error) {
        console.error(
            "Activate Contract Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getContracts = async (req, res) => {
    try {
        // Only Company users can view company contracts
        if (req.user.organizationType !== "COMPANY") {
            return res.status(403).json({
                message: "Only company users can view contracts"
            });
        }

        const contracts = await Contract.find()
            .populate("partnershipId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Contracts found successfully",
            count: contracts.length,
            contracts
        });

    } catch (error) {
        console.error(
            "Get Contracts Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getContractByNumber = async (req, res) => {
    try {
        const { contractNumber } = req.params;

        const contract = await Contract.findOne({
            contractNumber
        }).populate("partnershipId");

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }

        res.status(200).json({
            message: "Contract found successfully",
            contract
        });

    } catch (error) {
        console.error(
            "Get Contract Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
const terminateContract = async (req, res) => {
    try {
        const { contractNumber } = req.params;

        const contract = await Contract.findOne({
            contractNumber
        });

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found"
            });
        }

        if (contract.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Only active contracts can be terminated"
            });
        }

        const partnership = await Partnership.findById(
            contract.partnershipId
        );

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        contract.status = "TERMINATED";
        await contract.save();

        // Remove this contract as the current contract
        if (
            partnership.currentContractId &&
            partnership.currentContractId.toString() ===
            contract._id.toString()
        ) {
            partnership.currentContractId = null;
            await partnership.save();
        }

        res.status(200).json({
            message: "Contract terminated successfully",
            contract
        });

    } catch (error) {
        console.error(
            "Terminate Contract Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createContract,
    activateContract,
    getContracts,
    getContractByNumber,
    terminateContract
};