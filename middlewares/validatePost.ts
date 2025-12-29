import { body } from 'express-validator';

const validateTitle = body('title')
  .trim()
  .notEmpty()
  .withMessage('Title is required')
  .isLength({ max: 50 })
  .withMessage('Title should not exceed 50 characters');

const validateContent = body('content')
  .trim()
  .notEmpty()
  .withMessage('Content is required');

export default [validateTitle, validateContent];
