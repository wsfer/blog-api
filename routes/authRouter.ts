import { Router } from 'express';
import { validateLogin, validateRegister } from '../middlewares/validateUser';
import authController from '../controllers/authController';
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
