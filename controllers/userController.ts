import type { Request, Response } from 'express';
import type { GetUsersQueryParams } from '../types/queryParams';
import { prisma } from '../lib/prisma';
import { matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';

const USERS_PER_PAGE = 10;

async function getUsers(req: Request, res: Response) {
  const queryParams: GetUsersQueryParams = matchedData(req);
  const [count, users] = await prisma.$transaction([
    prisma.user.count({
      where: {
        username: { contains: queryParams.username, mode: 'insensitive' },
        email: { contains: queryParams.email, mode: 'insensitive' },
        role: { equals: queryParams.role },
      },
    }),
    prisma.user.findMany({
      take: USERS_PER_PAGE,
      skip: (queryParams.page - 1) * USERS_PER_PAGE,
      where: {
        username: { contains: queryParams.username, mode: 'insensitive' },
        email: { contains: queryParams.email, mode: 'insensitive' },
        role: { equals: queryParams.role },
      },
      orderBy: { [queryParams.orderBy]: queryParams.order },
    }),
  ]);

  res.json({
    data: users,
    pagination: {
      count: count,
      currentPage: queryParams.page,
      pageSize: USERS_PER_PAGE,
    },
  });
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
