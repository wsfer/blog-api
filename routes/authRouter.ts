import { Router } from 'express';
import authController from '../controllers/authController';

const authRouter = Router();

authRouter.get('/profile', authController.getProfile);
authRouter.post('/login', authController.postLogin);
authRouter.post('/register', authController.postRegister);
authRouter.post('/logout', authController.postLogout);

export default authRouter;
