import { Router } from 'express';
import { login, signup, deleteUser } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/delete', deleteUser);

export default router;
