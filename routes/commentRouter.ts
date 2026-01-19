import { Router } from 'express';
import { validateCreateComment } from '../middlewares/validateComment';
import commentController from '../controllers/commentController';
import authenticateUser from '../middlewares/authenticateUser';
import handleFormErrors from '../middlewares/handleFormErrors';

const commentRouter = Router();

commentRouter.get('/:commentId', commentController.getComment);

commentRouter.post(
  '/:postId',
  authenticateUser(),
  validateCreateComment,
  handleFormErrors,
  commentController.postComment
);

commentRouter.patch('/:commentId', commentController.updateComment);
commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;
