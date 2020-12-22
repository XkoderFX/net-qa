import { Router } from 'express';
import { authCheck, login, signup, test } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/myPosts', authCheck, test);

export default router;
