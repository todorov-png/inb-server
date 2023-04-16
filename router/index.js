import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/activation-code', userController.sendNewActivationCode);
router.put('/update-user', userController.updateUser);
router.get('/users', authMiddleware, userController.getUsers); //тестовый

export default router;
