import express from 'express';
import UserController from '../../controllers/userController';

const router = express.Router();

router.get('/',UserController.getAllUsers);
router.post('/new-user',UserController.addNewUser);

export default router;