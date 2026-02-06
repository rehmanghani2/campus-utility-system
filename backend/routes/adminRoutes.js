import express from 'express'
const adminRouter = express.Router();
import {
    getAllRequests,
    updateRequestStatus,
    getDashboardStats,
    getAllUsers 
} from '../controllers/adminController.js'
import { authorize, protect } from '../middleware/authMiddleware.js';

adminRouter.use(protect);
adminRouter.use(authorize('admin'));

adminRouter.get('/stats', getDashboardStats);
adminRouter.get('/users', getAllUsers);
adminRouter.get('/requests', getAllRequests)
adminRouter.put('/requests/:id', updateRequestStatus)

export default adminRouter