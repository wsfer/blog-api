import { Router } from 'express';
import commentController from '../controllers/commentController';

const commentRouter = Router();

commentRouter.get('/:commentId', commentController.getComment);
commentRouter.post('/:postId', commentController.postComment);
commentRouter.patch('/:commentId', commentController.updateComment);
commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;
