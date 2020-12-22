import { Router } from 'express';
import { authCheck } from '../controllers/authController';
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
} from '../controllers/postController';

const router = Router();

router.use(authCheck);

router.post('/', createPost);
router.patch('/:id', updatePost);
router.get('/:id', getPost);
router.get('/', getAllPosts);

export default router;
