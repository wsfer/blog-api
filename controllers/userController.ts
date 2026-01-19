import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

function getUsers(req: Request, res: Response) {
  res.status(418).end();
}

async function getUser(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
}

// Creates a new user without sign in
async function postUser(req: Request, res: Response) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    },
  });

  res.status(201).json(newUser);
}

function updateUser(req: Request, res: Response) {
  res.status(418).end();
}

function deleteUser(req: Request, res: Response) {
  res.status(418).end();
}

export default { getUsers, getUser, postUser, updateUser, deleteUser };
