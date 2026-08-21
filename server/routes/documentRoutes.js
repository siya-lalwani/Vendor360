const express = require("express");

const {
    createDocumentRequest,
    submitDocument,
    approveDocument,
    rejectDocument,
    getDocumentRequests,
    getDocuments
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Company creates a document request
router.post(
    "/requests",
    protect,
    createDocumentRequest
);

// Get all document requests
router.get(
    "/requests",
    protect,
    getDocumentRequests
);

// Vendor submits a document
router.post(
    "/",
    protect,
    submitDocument
);

// Get all submitted documents
router.get(
    "/",
    protect,
    getDocuments
);

// Company approves a document
router.patch(
    "/:documentId/approve",
    protect,
    approveDocument
);

// Company rejects a document
router.patch(
    "/:documentId/reject",
    protect,
    rejectDocument
);

module.exports = router;