import express from 'express';
import ComplaintController from '../../controllers/ComplaintController';

const router = express.Router();

router.post('/', ComplaintController.addComplaint);
router.get('/',ComplaintController.getAllComplaints);

export default router;