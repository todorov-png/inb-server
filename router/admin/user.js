import { Router } from 'express';
import UserController from '../../controllers/user-controller.js';
import authMiddleware from '../../middlewares/auth-middleware.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';

const router = new Router();

router.get(
  '/user/all',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam', 'deleteUser']),
  UserController.getAll
);
router.post(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['createUser']),
  UserController.create
);
router.put(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam']),
  UserController.update
);
router.delete(
  '/user',
  authMiddleware,
  permissionMiddleware.bind(['deleteUser']),
  UserController.delete
);

export default router;
