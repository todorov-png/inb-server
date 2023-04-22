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
router.put('/user-update', authMiddleware, UserController.updateUser);

router.get('/roles', authMiddleware, AdminController.fetchRoles);
router.get('/roles-list', authMiddleware, AdminController.fetchRolesList);
router.delete('/roles', authMiddleware, AdminController.deleteRoles);
router.post('/role', authMiddleware, AdminController.createRole);
router.put('/role', authMiddleware, AdminController.updateRole);
router.delete('/role', authMiddleware, AdminController.deleteRole);

router.get('/teams', authMiddleware, AdminController.fetchTeams);
router.get('/teams-list', authMiddleware, AdminController.fetchTeamsList);
router.post('/team', authMiddleware, AdminController.createTeam);
router.put('/team', authMiddleware, AdminController.updateTeam);
router.delete('/team', authMiddleware, AdminController.deleteTeam);

router.get('/users', authMiddleware, AdminController.fetchUsers);
router.put('/user', authMiddleware, AdminController.editUser);
// router.delete('/user', authMiddleware, AdminController.deleteUser);

export default router;
