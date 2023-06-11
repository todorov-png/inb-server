import { Router } from 'express';
import ProductController from '../../controllers/product-controller.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['createProduct', 'deleteProduct']),
  ProductController.getAll
);

router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createProduct']),
  ProductController.create
);

router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createProduct']),
  ProductController.update
);

router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteProduct']),
  ProductController.delete
);

// router.get(
//   '/',
//   authMiddleware,
//   // permissionMiddleware.bind(['createRole', 'deleteRole']),
//   ProductController.get
// );

// router.get(
//   '/full',
//   authMiddleware,
//   // permissionMiddleware.bind(['createRole', 'deleteRole']),
//   ProductController.getFull
// );

export default router;
