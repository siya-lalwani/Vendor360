const jwt = require("jsonwebtoken");
const protect = (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        
        // check whether the header exists
        if(!authHeader){
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        // check that it follows the Bearer token format
        const parts = authHeader.split(" ");
        if(parts.length !==2 || parts[0] !== "Bearer"){
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }
        const token = parts[1];

        // Verify the JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store the decoded user information in the request
        req.user = decoded;

        // Continue to the next middleware/route
        next();
    } catch(error){
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
module.exports = protect;