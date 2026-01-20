import { Router } from 'express';
import {
  validateRegister,
  sanitizeGetUsersQuery,
} from '../middlewares/validateUser';
import { sanitizeGetCommentsQuery } from '../middlewares/validateComment';
import userController from '../controllers/userController';
import commentController from '../controllers/commentController';
import authenticateUser from '../middlewares/authenticateUser';
import handleFormErrors from '../middlewares/handleFormErrors';

const userRouter = Router();

userRouter.get(
  '/',
  authenticateUser(['ADMIN']),
  sanitizeGetUsersQuery,
  userController.getUsers
);
userRouter.get('/:userId', authenticateUser(['ADMIN']), userController.getUser);
userRouter.get(
  '/:userId/comments',
  authenticateUser(['ADMIN']),
  sanitizeGetCommentsQuery,
  commentController.getUserComments
);

userRouter.post(
  '/',
  authenticateUser(['ADMIN']),
  validateRegister,
  handleFormErrors,
  userController.postUser
);

userRouter.patch('/:userId', userController.updateUser);
userRouter.delete(
  '/:userId',
  authenticateUser(['ADMIN']),
  userController.deleteUser
);

export default userRouter;
