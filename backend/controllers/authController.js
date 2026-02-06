import User from "../models/User.js";
import jwt from 'jsonwebtoken'

// Generate JWT Token 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Register User
// POST /api/auth/signup
// Public route
const signup = async (req, res) => {
    try {
        const { name, email, password, role, studentId,department, phone } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        
        if(userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student',
            studentId,
            department,
            phone
        });
        // Generate Token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                token
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// Login User
// POST /api/auth/login
// Public
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // validate email and password
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }
        // Check for user
        const user = await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // Check password
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.role,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get current logged in user
// GET /api/auth/me
// Private route
const getMe = async (req, res) => {
    try {
        const user = User.findById(req.user.id);
        res.status(200).json({
            success: true,
            date: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// Update User Profile
// PUT /api/auth/profile
// Private route
const updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            phone: req.body.phone,
            department: req.body.department
        };
        const user = await User.findByIdAndUpdate(
            req.user.id,
            fieldsToUpdate,
            {new: true, runValidators: true}
        );
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export {signup, login, getMe, updateProfile}