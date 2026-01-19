import { body } from 'express-validator';

const validateCreateComment = body('content')
  .trim()
  .notEmpty()
  .withMessage('Content is required')
  .isLength({ max: 400 })
  .withMessage('Comment should not exceed 400 characters');

export { validateCreateComment };
