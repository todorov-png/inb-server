import { Router } from 'express';
import CategoryController from '../../controllers/category-controller.js';
// import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.post(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  CategoryController.create
);

router.put(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  CategoryController.update
);

router.delete(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['deleteRole']),
  CategoryController.delete
);

router.get(
  '/list',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  CategoryController.getList
);

export default router;
