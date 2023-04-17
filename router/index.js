import { Router } from 'express';
import UserController from '../controllers/user-controller.js';
import AdminController from '../controllers/admin-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.post('/activation-code', authMiddleware, UserController.sendNewActivationCode);
router.put('/update-user', authMiddleware, UserController.updateUser);
router.get('/roles', authMiddleware, AdminController.fetchRoles);
router.post('/role', authMiddleware, AdminController.createRole);
router.put('/role', authMiddleware, AdminController.updateRole);
router.get('/users', authMiddleware, UserController.getUsers); //тестовый

export default router;
