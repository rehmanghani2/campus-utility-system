import ServiceRequest from "../models/ServiceRequest.js";

// @desc    Create new service request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
    try {
        console.log('Creating request for user:', req.user.id);
        console.log('Request body:', req.body);

        // Prepare request data
        const requestData = {
            title: req.body.title,
            userId: req.user.id,
            category: req.body.category,
            description: req.body.description,
            location: {
                building: req.body.location?.building || req.body.building,
                floor: req.body.location?.floor || req.body.floor || '',
                roomNumber: req.body.location?.roomNumber || req.body.roomNumber || ''
            },
            priority: req.body.priority || 'Medium'
        };

        console.log('Prepared request data:', requestData);

        const serviceRequest = await ServiceRequest.create(requestData);

        console.log('Request created:', serviceRequest._id);

        res.status(201).json({
            success: true,
            message: 'Service request submitted successfully',
            data: serviceRequest
        });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all requests for logged in user
// @route   GET /api/requests/my-requests
// @access  Private
const getMyRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        console.log("my-requests: ", requests)
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
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private
const getRequest = async (req, res) => {
    try {
        const request = await ServiceRequest.findById(req.params.id)
            .populate('userId', 'name email department phone');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Make sure user is owner or admin
        if (request.userId._id.toString() !== req.user.id && 
            req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this request'
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update request (by user - limited fields)
// @route   PUT /api/requests/:id
// @access  Private
const updateRequest = async (req, res) => {
    try {
        let request = await ServiceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check ownership
        if (request.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this request'
            });
        }

        // Only allow update if status is Pending
        if (request.status !== 'Pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot update request that is already in progress'
            });
        }

        // Fields user can update
        const allowedUpdates = ['title', 'description', 'category', 
                               'location', 'priority'];
        const updates = {};
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        request = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

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
};

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private
const deleteRequest = async (req, res) => {
    try {
        const request = await ServiceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check ownership or admin
        if (request.userId.toString() !== req.user.id && 
            req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this request'
            });
        }

        await request.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Request deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get request statistics for user
// @route   GET /api/requests/stats
// @access  Private
const getMyStats = async (req, res) => {
    try {
        const stats = await ServiceRequest.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedStats = {
            total: 0,
            pending: 0,
            inProgress: 0,
            resolved: 0,
            rejected: 0
        };

        stats.forEach(stat => {
            formattedStats.total += stat.count;
            if (stat._id === 'Pending') formattedStats.pending = stat.count;
            if (stat._id === 'In Progress') formattedStats.inProgress = stat.count;
            if (stat._id === 'Resolved') formattedStats.resolved = stat.count;
            if (stat._id === 'Rejected') formattedStats.rejected = stat.count;
        });

        res.status(200).json({
            success: true,
            data: formattedStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { createRequest, getMyRequests, getRequest, updateRequest, deleteRequest, getMyStats };