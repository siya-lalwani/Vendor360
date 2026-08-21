const DocumentRequest = require("../models/DocumentRequest");
const Partnership = require("../models/Partnership");
const User = require("../models/User");
const Document = require("../models/Document");

const createDocumentRequest = async (req, res) => {
    try {
        const {
            partnershipId,
            requestedTo,
            title,
            description,
            priority,
            dueDate
        } = req.body;

        // Check required fields
        if (
            !partnershipId ||
            !requestedTo ||
            !title
        ) {
            return res.status(400).json({
                message: "Please provide all required document request details"
            });
        }

        // Only Company users can create document requests
        if (req.user.organizationType !== "COMPANY") {
            return res.status(403).json({
                message: "Only company users can request documents"
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

        // Document requests can only be made for active partnerships
        if (partnership.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Documents can only be requested for active partnerships"
            });
        }

        // Find requested user
        const requestedUser = await User.findById(
            requestedTo
        );

        if (!requestedUser) {
            return res.status(404).json({
                message: "Requested user not found"
            });
        }

        // Create document request
        const documentRequest = await DocumentRequest.create({
            partnershipId: partnership._id,
            requestedBy: req.user.userId,
            requestedTo: requestedUser._id,
            title,
            description,
            priority: priority || "MEDIUM",
            dueDate: dueDate || null,
            status: "PENDING"
        });

        res.status(201).json({
            message: "Document request created successfully",
            documentRequest
        });

    } catch (error) {
        console.error(
            "Create Document Request Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const submitDocument = async (req, res) => {
    try {
        const {
            documentRequestId,
            originalFileName,
            storedFileName,
            mimeType,
            fileSize,
            fileUrl
        } = req.body;

        // Check required fields
        if (
            !documentRequestId ||
            !originalFileName ||
            !storedFileName ||
            !mimeType ||
            fileSize === undefined ||
            !fileUrl
        ) {
            return res.status(400).json({
                message: "Please provide all required document details"
            });
        }

        // Only Vendor users can submit documents
        if (req.user.organizationType !== "VENDOR") {
            return res.status(403).json({
                message: "Only vendor users can submit documents"
            });
        }

        // Find document request
        const documentRequest = await DocumentRequest.findById(
            documentRequestId
        );

        if (!documentRequest) {
            return res.status(404).json({
                message: "Document request not found"
            });
        }

        // Request must be pending
        if (documentRequest.status !== "PENDING") {
            return res.status(400).json({
                message: "This document request is no longer pending"
            });
        }

        // Verify that this request was sent to the logged-in user
        if (
            documentRequest.requestedTo.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to submit this document"
            });
        }

        // Create document
        const document = await Document.create({
            documentRequestId: documentRequest._id,
            partnershipId: documentRequest.partnershipId,
            uploadedBy: req.user.userId,
            originalFileName,
            storedFileName,
            mimeType,
            fileSize,
            fileUrl
        });

        // Update request status
        documentRequest.status = "SUBMITTED";
        await documentRequest.save();

        res.status(201).json({
            message: "Document submitted successfully",
            document
        });

    } catch (error) {
        console.error(
            "Submit Document Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const approveDocument = async (req, res) => {
    try {
        const { documentId } = req.params;

        // Only Company users can approve documents
        if (req.user.organizationType !== "COMPANY") {
            return res.status(403).json({
                message: "Only company users can approve documents"
            });
        }

        // Find document
        const document = await Document.findById(
            documentId
        );

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        // Find the document request
        const documentRequest = await DocumentRequest.findById(
            document.documentRequestId
        );

        if (!documentRequest) {
            return res.status(404).json({
                message: "Document request not found"
            });
        }

        // Document must be submitted
        if (documentRequest.status !== "SUBMITTED") {
            return res.status(400).json({
                message: "Only submitted documents can be approved"
            });
        }

        // Find the partnership
        const partnership = await Partnership.findById(
            documentRequest.partnershipId
        );

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Partnership must be active
        if (partnership.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Document can only be approved for an active partnership"
            });
        }

        // Approve document request
        documentRequest.status = "APPROVED";
        await documentRequest.save();

        res.status(200).json({
            message: "Document approved successfully",
            document
        });

    } catch (error) {
        console.error(
            "Approve Document Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const rejectDocument = async (req, res) => {
    try {
        const { documentId } = req.params;

        // Only Company users can reject documents
        if (req.user.organizationType !== "COMPANY") {
            return res.status(403).json({
                message: "Only company users can reject documents"
            });
        }

        // Find document
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        // Find document request
        const documentRequest = await DocumentRequest.findById(
            document.documentRequestId
        );

        if (!documentRequest) {
            return res.status(404).json({
                message: "Document request not found"
            });
        }

        // Document must be submitted
        if (documentRequest.status !== "SUBMITTED") {
            return res.status(400).json({
                message: "Only submitted documents can be rejected"
            });
        }

        // Find partnership
        const partnership = await Partnership.findById(
            documentRequest.partnershipId
        );

        if (!partnership) {
            return res.status(404).json({
                message: "Partnership not found"
            });
        }

        // Partnership must be active
        if (partnership.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Document can only be rejected for an active partnership"
            });
        }

        // Reject document request
        documentRequest.status = "REJECTED";
        await documentRequest.save();

        res.status(200).json({
            message: "Document rejected successfully",
            document
        });

    } catch (error) {
        console.error(
            "Reject Document Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getDocumentRequests = async (req, res) => {
    try {
        const requests = await DocumentRequest.find()
            .populate("partnershipId")
            .populate("requestedBy", "name email role organizationType")
            .populate("requestedTo", "name email role organizationType")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Document requests found successfully",
            count: requests.length,
            requests
        });

    } catch (error) {
        console.error(
            "Get Document Requests Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find()
            .populate(
                "documentRequestId"
            )
            .populate(
                "partnershipId"
            )
            .populate(
                "uploadedBy",
                "name email role organizationType"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Documents found successfully",
            count: documents.length,
            documents
        });

    } catch (error) {
        console.error(
            "Get Documents Error:",
            error.message
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createDocumentRequest,
    submitDocument,
    approveDocument,
    rejectDocument,
    getDocumentRequests,
    getDocuments
};