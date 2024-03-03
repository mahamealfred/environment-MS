import express from 'express';
import categoryControler from '../../controllers/CategoryController';

const router = express.Router();

router.post('/', categoryControler.addCategory);
router.get('/',categoryControler.getAllCategories);

export default router;