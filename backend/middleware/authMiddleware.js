import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Protect Routes - VErify Toekn
const protect = async (req, res, next) => {
    let token;

    // check for toekn in header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        // Check if token is not 'null', 'undefined', or empty
        if (token === 'null' || token === 'undefined' || token === '') {
            token = null;
        }
    }

    // Make sure token exists
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided'
        });
    }
    try {
        // verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id);

        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again'
            });
        }
        // Call next() to proceed to the route handler
        next();
    } catch (error) {
        // Handle specific
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized`
            });
        }
        next();
    }
}

export { protect, authorize };