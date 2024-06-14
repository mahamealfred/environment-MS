import express from 'express';
import OrganizationController from '../../controllers/OrganizationController';

const router = express.Router();

router.post('/', OrganizationController.addOrganization);
router.get('/',OrganizationController.getOrganizations);

export default router;