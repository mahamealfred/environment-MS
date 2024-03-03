import express from 'express';
import questionControler from '../../controllers/QuestionController';

const router = express.Router();

router.post('/', questionControler.addQuestion);
router.get('/',questionControler.getAllQuestions);

export default router;