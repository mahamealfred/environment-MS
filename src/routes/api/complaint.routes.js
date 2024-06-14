import express from 'express';
import ComplaintController from '../../controllers/ComplaintController';
import multer from 'multer';
const upload=multer({dest:'src/uploads/'});


const router = express.Router();

router.post('/', ComplaintController.addComplaint);
router.get('/',ComplaintController.getAllComplaints);

router.put('/approve/:id',ComplaintController.approveComplaint);
router.put('/cancel/:id',ComplaintController.cancelledComplaint);

router.get('/complaints-byuserId/:id',ComplaintController.getAllComplaintsByUserId)
export default router;