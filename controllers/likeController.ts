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
  await prisma.likesOnPosts.create({
    data: {
      post: { connect: { id: req.params.postId } },
      user: { connect: { id: (req.user as User).id } },
    },
  });
  res.status(201).end();
}

async function deleteLike(req: Request, res: Response) {
  await prisma.likesOnPosts.delete({
    where: {
      postId_userId: {
        postId: req.params.postId,
        userId: (req.user as User).id,
      },
    },
  });
  res.status(204).end();
}

export default { getPostLikes, getUserLikes, postLike, deleteLike };
