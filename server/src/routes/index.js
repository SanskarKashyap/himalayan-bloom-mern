import { Router } from 'express';

import { getUsers, createUser } from '../controllers/userController.js';
import { authenticateWithGoogle } from '../controllers/authController.js';
import { createPaymentOrder } from '../controllers/paymentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/users', authenticate, authorize('Admin'), getUsers);
router.post('/users', authenticate, authorize('Admin'), createUser);
router.post('/auth/google', authenticateWithGoogle);
router.post('/payments/order', authenticate, authorize('Admin', 'Consumer'), createPaymentOrder);

export default router;
