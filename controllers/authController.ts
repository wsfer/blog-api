import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import validateUser from '../middlewares/validateUser';
import bcrypt from 'bcryptjs';

function getProfile(req: Request, res: Response) {
  res.status(418).end();
}

function postLogin(req: Request, res: Response) {
  res.status(418).end();
}

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
