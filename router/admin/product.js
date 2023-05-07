import { Router } from 'express';
import ProductController from '../../controllers/product-controller.js';
// import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.post(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  ProductController.create
);

router.put(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  ProductController.update
);

router.delete(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['deleteRole']),
  ProductController.delete
);

router.get(
  '/list',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  ProductController.getList
);

router.get(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  ProductController.get
);

router.get(
  '/full',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  ProductController.getFull
);

export default router;
