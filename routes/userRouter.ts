import { Router } from 'express';
import { validateRegister } from '../middlewares/validateUser';
import userController from '../controllers/userController';
import commentController from '../controllers/commentController';
import authenticateUser from '../middlewares/authenticateUser';
import handleFormErrors from '../middlewares/handleFormErrors';

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.get('/:userId/comments', commentController.getUserComments);

userRouter.post(
  '/',
  authenticateUser(['ADMIN']),
  validateRegister,
  handleFormErrors,
  userController.postUser
);

userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
