import { body, query } from 'express-validator';
import { prisma } from '../lib/prisma';

const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];

const validateRegister = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Username is too short, must be between 4 and 30 characters')
    .isLength({ max: 30 })
    .withMessage('Username is too long, must be between 4 and 30 characters')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });

      if (existingUser) {
        throw new Error();
      }
    })
    .withMessage('Username is already in use'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid.')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: value },
      });

      if (existingUser) {
        throw new Error();
      }
    })
    .withMessage('Email is already in use'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password is too short, must be between 8 and 20 characters')
    .isLength({ max: 20 })
    .withMessage('Password is too long, must be between 8 and 20 characters'),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Confirm password is different from password field'),
  body('role')
    .optional()
    .trim()
    .toUpperCase()
    .custom((value) => ['ADMIN', 'USER'].includes(value))
    .withMessage('Invalid role'),
];

// const validateUpdateUser = [];

const sanitizeGetUsersQuery = [
  query('username').default(undefined),
  query('email').default(undefined),
  query('role')
    .toUpperCase()
    .customSanitizer((role) =>
      ['ADMIN', 'USER'].includes(role) ? role : undefined
    ),
  query('page')
    .toInt()
    .customSanitizer((page) => (page < 1 ? 1 : page))
    .default(1), // Because NaN < 1 returns false above
  query('orderBy').customSanitizer((orderBy) =>
    ['username', 'email', 'createdAt', 'updatedAt'].includes(orderBy)
      ? orderBy
      : 'createdAt'
  ),
  query('order').customSanitizer((order) =>
    ['desc', 'asc'].includes(order) ? order : 'desc'
  ),
];

export { validateLogin, validateRegister, sanitizeGetUsersQuery };
