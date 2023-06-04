import { Router } from 'express';
import CountryController from '../../controllers/country-controller.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['createCountry', 'deleteCountry']),
  CountryController.getAll
);

router.get(
  '/list',
  authMiddleware,
  permissionMiddleware.bind(['assignCountry']),
  CountryController.getList
);

router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createCountry']),
  CountryController.create
);

router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createCountry']),
  CountryController.update
);

router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteCountry']),
  CountryController.delete
);

export default router;
