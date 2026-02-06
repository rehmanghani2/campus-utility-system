import ServiceRequest from "../models/ServiceRequest.js";
import User from "../models/User.js";

// Get all requests (admin)
// Get /api/admin/requests
// Private admin route

const getAllRequests = async (req,res) => {
    try {
        // Build query
        let query = {};

        // Filter by status
        if (req.query.status) {
            query.status = req.query.status;
        }

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Filter by priority
        if(req.query.priority){
            query.priority = req.query.priority;
        }

        const requests = await ServiceRequest.find(query)
            .populate('userId', 'name email department studentId phone')
            .sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update request status (Admin)
// PUT /api/admin/requests/:id
// private admin route

const updateRequestStatus = async (req, res) => {
    try {
        const { status, assignedTo, remarks } = req.body;

        let request = await ServiceRequest.findById(req.params.id)
        if(!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }
        // Update fields
        if (status) request.status = status;
        if (assignedTo) request.assignedTo = assignedTo;
        if (remarks) request.remarks = remarks;

        await request.save();

        res.status(200).json({
            success: true,
            message: 'Request updated successfully',
            data: request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// Get dashboard statistics (Admin)
// GET /api/admin/stats
// private admin route
const getDashboardStats = async (req, res) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student'});
        const totalStaff = await User.countDocuments({ role: 'staff'});

        // Request statistics
        const requestStats = await ServiceRequest.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1}
                }
            }
        ]);

        // Category-wise statistics
        const categoryStats = await ServiceRequest.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1}
                }
            },
            { $sort: {count: -1}}
        ]);

        // Recent requests
        const recentRequests = await ServiceRequest.find()
                .populate('userId', 'name department')
                .sort({ createdAt: -1})
                .limit(5);
        
        // Format request stats
        const formattedRequestStats = {
            total: 0,
            pending: 0,
            inProgress: 0,
            resolved: 0,
            rejected: 0
        }

        requestStats.forEach(stat => {
            formattedRequestStats.total += stat.count;
             if (stat._id === 'Pending') formattedRequestStats.pending = stat.count;
            if (stat._id === 'In Progress') formattedRequestStats.inProgress = stat.count;
            if (stat._id === 'Resolved') formattedRequestStats.resolved = stat.count;
            if (stat._id === 'Rejected') formattedRequestStats.rejected = stat.count;
        });

        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    students: totalStudents,
                    staff: totalStaff
                },
                requests: formattedRequestStats,
                categoryStats,
                recentRequests
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get all users (Admin)
// GET /api/admin/users
// private admin route
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export {getAllRequests, updateRequestStatus, getDashboardStats, getAllUsers}