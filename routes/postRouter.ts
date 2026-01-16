import { Router } from 'express';
import {
  validateCreatePost,
  validateUpdatePost,
  sanitizeGetPostsQuery,
} from '../middlewares/validatePost';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';
import authenticateUser from '../middlewares/authenticateUser';
import handleFormErrors from '../middlewares/handleFormErrors';

const postRouter = Router();

postRouter.get('/', sanitizeGetPostsQuery, postController.getPosts);
postRouter.get('/:postId', postController.getPost);
postRouter.get('/:postId/comments', commentController.getPostComments);

postRouter.post(
  '/',
  authenticateUser(['ADMIN']),
  validateCreatePost,
  handleFormErrors,
  postController.postPost
);

postRouter.patch(
  '/:postId',
  authenticateUser(['ADMIN']),
  validateUpdatePost,
  handleFormErrors,
  postController.updatePost
);

postRouter.delete(
  '/:postId',
  authenticateUser(['ADMIN']),
  postController.deletePost
);

export default postRouter;
