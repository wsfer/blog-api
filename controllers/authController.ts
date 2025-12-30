import type { User } from '../generated/prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import signInUser from '../utils/signInUser';
import bcrypt from 'bcryptjs';

function getProfile(req: Request, res: Response) {
  res.status(418).end();
}

async function postLogin(req: Request, res: Response) {
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

  const matchPassword: boolean = await bcrypt.compare(password, user.password);

  // Incorrect password
  if (!matchPassword) {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }

  const token = await signInUser(user);
  return res.json({ token });
}

async function postRegister(req: Request, res: Response) {
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

  const token = await signInUser(newUser);
  return res.json({ token });
}

function postLogout(req: Request, res: Response) {
  res.status(418).end();
}

export default { getProfile, postLogin, postRegister, postLogout };
