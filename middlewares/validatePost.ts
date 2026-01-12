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

// const validateUpdatePost = [];

export { validateCreatePost };
