import { Router } from 'express';
import authController from '../controllers/authController';
import validateLogin from '../middlewares/validateLogin';
import validateRegister from '../middlewares/validateRegister';

const authRouter = Router();

authRouter.get('/profile', authController.getProfile);
authRouter.post('/login', validateLogin, authController.postLogin);
authRouter.post('/register', validateRegister, authController.postRegister);
authRouter.post('/logout', authController.postLogout);

export default authRouter;
