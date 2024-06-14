import express from 'express';
import ActionController from '../../controllers/ActionController';

const router = express.Router();

router.post('/',ActionController.addAction);


export default router;