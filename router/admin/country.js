import { Router } from 'express';
import CountryController from '../controllers/country-controller.js';
// import permissionMiddleware from '../middlewares/permission-middleware.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  CountryController.create
);

router.put(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole']),
  CountryController.update
);

router.delete(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['deleteRole']),
  CountryController.delete
);

router.get(
  '/',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  CountryController.get
);

router.get(
  '/list',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  CountryController.getList
);

export default router;
