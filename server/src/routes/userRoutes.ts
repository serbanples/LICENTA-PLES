import { Router } from 'express';
import userController from '../controllers/userController';
import authenticateToken from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/users/:id', authenticateToken, userController.getUserbyId);
router.get('/users', authenticateToken, userController.getAllUsers);
router.delete('/users/:id', authenticateToken, userController.deleteUser);

export default router;