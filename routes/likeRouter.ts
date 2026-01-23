import { Router } from 'express';
import likeController from '../controllers/likeController';
import authenticateUser from '../middlewares/authenticateUser';

const likeRouter = Router();

likeRouter.post('/:postId', authenticateUser(), likeController.postLike);
likeRouter.delete('/:postId', authenticateUser(), likeController.deleteLike);

export default likeRouter;
