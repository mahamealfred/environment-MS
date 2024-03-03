import express from 'express';
import LocationController from '../../controllers/LocationController';

const router = express.Router();

router.post('/', LocationController.addLocation);
router.get('/',LocationController.getAllLocations);

export default router;