import { Router } from 'express';
import CategoryController from '../../controllers/category-controller.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['createCategory', 'deleteCategory']),
  CategoryController.getAll
);

router.get(
  '/list',
  authMiddleware,
  permissionMiddleware.bind(['assignCategory']),
  CategoryController.getList
);

router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createCategory']),
  CategoryController.create
);

router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createCategory']),
  CategoryController.update
);

router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteCategory']),
  CategoryController.delete
);

export default router;
