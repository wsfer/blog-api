import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

function getPostComments(req: Request, res: Response) {
  res.status(418).end();
}

function getUserComments(req: Request, res: Response) {
  res.status(418).end();
}

function getComment(req: Request, res: Response) {
  res.status(418).end();
}

async function postComment(req: Request, res: Response) {
  const newComment = await prisma.comment.create({
    data: {
      content: req.body.content,
      owner: {
        connect: { id: (req.user as User).id },
      },
      post: {
        connect: { id: req.params.postId },
      },
    },
  });

  res.status(201).json(newComment);
}

function updateComment(req: Request, res: Response) {
  res.status(418).end();
}

function deleteComment(req: Request, res: Response) {
  res.status(418).end();
}

export default {
  getPostComments,
  getUserComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
};
