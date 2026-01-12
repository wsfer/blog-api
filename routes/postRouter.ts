import { Router } from 'express';
import { validateCreatePost } from '../middlewares/validatePost';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';
import authenticateUser from '../middlewares/authenticateUser';
import handleFormErrors from '../middlewares/handleFormErrors';

const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:postId', postController.getPost);
postRouter.get('/:postId/comments', commentController.getPostComments);

postRouter.post(
  '/',
  authenticateUser(['ADMIN']),
  validateCreatePost,
  handleFormErrors,
  postController.postPost
);

postRouter.patch('/:postId', postController.updatePost);
postRouter.delete('/:postId', postController.deletePost);

export default postRouter;
