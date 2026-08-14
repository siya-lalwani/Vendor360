const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, organizationType } = req.body;

        // check whether all required fields are provided
        if (!name || !email || !password || !role || !organizationType) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        //check whether the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        // hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user document
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            organizationType
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user, name,
                email: user.email,
                role: user.role,
                organizationType: user.organizationType
            }
        });
    } catch (error) {
        console.error("Registration error: ", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // compare entered password with stored hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // create JWT
        const token = jwt.sign({
            userId: user._id,
            role: user.role,
            organizationType: user.organizationType
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationType: user.organizationType
            }
        });
    } catch(error){
        console.log("Login Error: ", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};