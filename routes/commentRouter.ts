import { Router } from 'express';
import {
  validateCreateComment,
  validateUpdateComment,
} from '../middlewares/validateComment';
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

commentRouter.patch(
  '/:commentId',
  authenticateUser(['ADMIN']),
  validateUpdateComment,
  handleFormErrors,
  commentController.updateComment
);

commentRouter.delete(
  '/:commentId',
  authenticateUser(),
  commentController.deleteComment
);

export default commentRouter;
