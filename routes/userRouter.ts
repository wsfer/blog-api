import { Router } from 'express';
import userController from '../controllers/userController';
import commentController from '../controllers/commentController';

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.get('/:userId/comments', commentController.getUserComments);
userRouter.post('/', userController.postUser);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
