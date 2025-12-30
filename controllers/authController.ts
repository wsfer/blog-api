import type { User } from '../generated/prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import validateUser from '../middlewares/validateUser';
import validateLogin from '../middlewares/validateLogin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'to_shut_up_typescript';
const JWT_EXPIRATION_TIME = 60 * 120; // 2h

function getProfile(req: Request, res: Response) {
  res.status(418).end();
}

const postLogin = [
  validateLogin,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }

    const { username, password } = req.body;
    const user: User | null = await prisma.user.findUnique({
      where: { username },
    });

    // User not found
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    const matchPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );

    // Incorrect password
    if (!matchPassword) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    jwt.sign(
      user,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION_TIME },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  },
];

const postRegister = [
  validateUser,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    // TODO: sign in jwt
    res.status(201).json(newUser);
  },
];

function postLogout(req: Request, res: Response) {
  res.status(418).end();
}

export default { getProfile, postLogin, postRegister, postLogout };
