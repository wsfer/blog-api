import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

function getPostLikes(req: Request, res: Response) {
  res.status(418).end();
}

function getUserLikes(req: Request, res: Response) {
  res.status(418).end();
}

async function postLike(req: Request, res: Response) {
  const { postId } = req.params;
  const userId = (req.user as User).id;

  await prisma.likesOnPosts.create({
    data: {
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    },
  });

  res.status(201).end();
}

function deleteLike(req: Request, res: Response) {
  res.status(418).end();
}

export default { getPostLikes, getUserLikes, postLike, deleteLike };
