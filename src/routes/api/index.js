import { Router } from 'express';

import authRoutes from "./auth.routes";
import categoryRoutes from './category.routes';
import questionRoutes from './question.routes';
import locationRoutes from './location.routes';
import complaintRoutes from "./complaint.routes";
const router = Router();


// set up auth routes v1
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/category', categoryRoutes);
router.use('/api/v1/question',questionRoutes);
router.use('/api/v1/location',locationRoutes);
router.use('/api/v1/complaint',complaintRoutes)



export default router;