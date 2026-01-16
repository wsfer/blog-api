import { body, query } from 'express-validator';

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

const sanitizeGetPostsQuery = [
  query('title').default(undefined),
  query('content').default(undefined),
  query('page')
    .toInt()
    .customSanitizer((page) => (page < 1 ? 1 : page))
    .default(1), // Because NaN < 1 returns false above
  query('orderBy').customSanitizer((orderBy) =>
    ['title', 'createdAt', 'updatedAt'].includes(orderBy)
      ? orderBy
      : 'createdAt'
  ),
  query('order').customSanitizer((order) =>
    ['desc', 'asc'].includes(order) ? order : 'desc'
  ),
];

export { validateCreatePost, validateUpdatePost, sanitizeGetPostsQuery };
