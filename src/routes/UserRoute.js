import { Router } from 'express';
import UsersController from '../controllers/PostUsersController';
import login from '../controllers/Login';
import loginRequiredMiddleware from '../middleware/loginRequiredMiddleware';

const router = new Router();

// Login not requires
router.post('/users', UsersController.create);
router.post('/users/login', login.login);

// Login required
router.get('/users', loginRequiredMiddleware.loginRequired, UsersController.index);
router.get('/users/', loginRequiredMiddleware.loginRequired, UsersController.show);

router.put('/users/', loginRequiredMiddleware.loginRequired, UsersController.update);

router.delete('/users/', loginRequiredMiddleware.loginRequired, UsersController.delete);

export default router;
