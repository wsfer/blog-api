import { body, query } from 'express-validator';

const validateCreateComment = body('content')
  .trim()
  .notEmpty()
  .withMessage('Content is required')
  .isLength({ max: 400 })
  .withMessage('Comment should not exceed 400 characters');

const validateUpdateComment = validateCreateComment; // Yes... it's the same function for now

const sanitizeGetCommentsQuery = [
  query('content').default(undefined),
  query('page')
    .toInt()
    .customSanitizer((page) => (page < 1 ? 1 : page))
    .default(1), // Because NaN < 1 returns false above
  query('orderBy').customSanitizer((orderBy) =>
    ['createdAt', 'updatedAt'].includes(orderBy) ? orderBy : 'createdAt'
  ),
  query('order').customSanitizer((order) =>
    ['desc', 'asc'].includes(order) ? order : 'desc'
  ),
];

export {
  validateCreateComment,
  validateUpdateComment,
  sanitizeGetCommentsQuery,
};
