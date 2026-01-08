import { Router } from 'express';
import authController from '../controllers/authController';
import validateLogin from '../middlewares/validateLogin';
import validateRegister from '../middlewares/validateRegister';
import handleFormErrors from '../middlewares/handleFormErrors';

const authRouter = Router();

authRouter.get('/profile', authController.getProfile);

authRouter.post(
  '/login',
  validateLogin,
  handleFormErrors,
  authController.postLogin
);

authRouter.post(
  '/register',
  validateRegister,
  handleFormErrors,
  authController.postRegister
);

authRouter.post('/logout', authController.postLogout);

export default authRouter;
