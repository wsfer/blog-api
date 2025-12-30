import { body } from 'express-validator';
import { prisma } from '../lib/prisma';

const validateUsername = body('username')
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
  .withMessage('Username is already in use');

const validateEmail = body('email')
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
  .withMessage('Email is already in use');

const validatePassword = body('password')
  .trim()
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password is too short, must be between 8 and 20 characters')
  .isLength({ max: 20 })
  .withMessage('Password is too long, must be between 8 and 20 characters');

const validateConfirmPassword = body('confirmPassword')
  .trim()
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Confirm password is different from password field');

export default [
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
];
