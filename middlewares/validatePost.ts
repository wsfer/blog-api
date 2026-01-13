import { body } from 'express-validator';

const validateCreatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title should not exceed 50 characters'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];

const validateUpdatePost = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title should not exceed 50 characters'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
];

export { validateCreatePost, validateUpdatePost };
