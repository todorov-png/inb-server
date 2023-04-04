import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers); //тестовый

// import mailService from '../service/mail-service.js';
// router.get('/email', async () => {
//   await mailService.sendActivationMail(
//     'zhenya.todorov@gmail.com',
//     `http://127.0.0.1:5000/api/activate/645648965486416846`
//   );
// });

export default router;
