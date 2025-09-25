import { Router } from 'express';

import { getUsers, createUser } from '../controllers/userController.js';
import { authenticateWithGoogle } from '../controllers/authController.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/auth/google', authenticateWithGoogle);

export default router;
