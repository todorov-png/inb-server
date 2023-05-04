import { Router } from 'express';
import UserController from '../controllers/user-controller.js';
import AdminController from '../controllers/admin-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import permissionMiddleware from '../middlewares/permission-middleware.js';

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.post('/activation-code', authMiddleware, UserController.sendNewActivationCode);
router.put('/user-update', authMiddleware, UserController.updateUser);
router.get('/lands', authMiddleware, UserController.getLands);

router.get(
  '/users',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam', 'deleteUser']),
  AdminController.fetchUsers
);
router.post(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['createUser']),
  AdminController.createUser
);
router.put(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam']),
  AdminController.editUser
);
router.delete(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['deleteUser']),
  AdminController.deleteUser
);

export default router;
