const Vendor = require("../models/Vendor");

const createVendor = async (req, res) => {
    try {
        const {
            vendorName,
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

        // Check required fields
        if (
            !vendorName ||
            !email ||
            !phone ||
            !industry ||
            !address ||
            !city ||
            !state ||
            !country
        ) {
            return res.status(400).json({
                message: "Please provide all required vendor details"
            });
        }

        // Check whether vendor email already exists
        const existingEmail = await Vendor.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Vendor email already exists"
            });
        }

        // Generate Vendor ID
        const vendorCount = await Vendor.countDocuments();
        const vendorId = `VEN-${String(vendorCount + 1).padStart(6, "0")}`;

        // Create vendor
        const vendor = await Vendor.create({
            vendorId,
            vendorName,
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
            createdBy: req.user.userId,
            profileCompleted: true
        });

        res.status(201).json({
            message: "Vendor profile created successfully",
            vendor
        });

    } catch (error) {
        console.error("Create Vendor Error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Search Vendors
const searchVendors = async (req,res) =>{
    try{
        const {query} = req.query;

        // Check whether search query was provided
        if(!query || !query.trim()){
            return res.status(400).json({
                message: "Please provide a vendor name or vendor ID to search"
            });
        }
        // Search by Vendor ID or Vendor Name
        const vendors = await Vendor.find({
            $or: [
                {
                    vendorId: {
                        $regex: query.trim(),
                        $options: "i"
                    }
                },
                {
                    vendorName: {
                        $regex: query.trim(),
                        $options: "i"
                    }
                }
            ]
        }).select(
            "vendorId vendorName email phone industry city state country description logo profileCompleted"
        );

        // No vendors found
        if(vendors.length === 0){
            return res.status(404).json({
                message: "No vendors found"
            });
        }
        res.status(200).json({
            message: "Vendors found successfully",
            count: vendors.length,
            vendors
        });
    } catch(error){
        console.error("Serach Vendor Error: ",error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createVendor,
    searchVendors
};