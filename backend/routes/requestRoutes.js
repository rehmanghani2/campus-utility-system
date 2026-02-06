import express from 'express'
const requestRouter = express.Router()
import {
    createRequest,
    getMyRequests,
    getRequest, 
    updateRequest,
    deleteRequest,
    getMyStats
} from '../controllers/requestController.js'
import { protect } from '../middleware/authMiddleware.js'

// All routes are protected
requestRouter.use(protect);

// Create new request
requestRouter.post('/', createRequest);

// Get user's requests
requestRouter.get('/my-requests', getMyRequests);

// Get user's stats
requestRouter.get('/stats', getMyStats);

// Single request operations
requestRouter.get('/:id', getRequest);
requestRouter.put('/:id', updateRequest);
requestRouter.delete('/:id', deleteRequest);

export default requestRouter