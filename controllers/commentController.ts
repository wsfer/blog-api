import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import type { GetCommentsQueryParams } from '../types/queryParams';
import { prisma } from '../lib/prisma';
import { matchedData } from 'express-validator';

const COMMENTS_PER_PAGE = 10;

async function getPostComments(req: Request, res: Response) {
  const { postId } = req.params;
  const queryParams: GetCommentsQueryParams = matchedData(req);
  const [count, comments] = await prisma.$transaction([
    prisma.comment.count({
      where: {
        postId: postId,
        content: { contains: queryParams.content, mode: 'insensitive' },
      },
    }),
    prisma.comment.findMany({
      take: COMMENTS_PER_PAGE,
      skip: (queryParams.page - 1) * COMMENTS_PER_PAGE,
      where: {
        postId: postId,
        content: { contains: queryParams.content, mode: 'insensitive' },
      },
    }),
  ]);

  res.json({
    data: comments,
    pagination: {
      count: count,
      currentPage: queryParams.page,
      pageSize: COMMENTS_PER_PAGE,
    },
  });
}

function getUserComments(req: Request, res: Response) {
  res.status(418).end();
}

async function getComment(req: Request, res: Response) {
  const { commentId } = req.params;
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) {
    return res.status(404).end();
  }

  res.json(comment);
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

async function updateComment(req: Request, res: Response) {
  const { commentId } = req.params;
  const user = req.user as User;
  const isAdmin = user.role === 'ADMIN';

  // Ownership verification (admins skip this)
  if (!isAdmin) {
    const commentToUpdate = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    // Comment not found
    if (!commentToUpdate) return res.status(404).end();

    const isOwner = commentToUpdate.ownerId === user.id;

    // User is not comment author
    if (!isOwner) return res.status(403).end();
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      content: req.body.content,
      updatedAt: new Date(),
    },
  });

  res.json(updatedComment);
}

async function deleteComment(req: Request, res: Response) {
  const { commentId } = req.params;
  const user = req.user as User;
  const isAdmin = user.role === 'ADMIN';

  // Ownership verification (admins skip this)
  if (!isAdmin) {
    const commentToDelete = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    // Comment not found
    if (!commentToDelete) return res.status(404).end();

    const isOwner = commentToDelete.ownerId === user.id;

    // User is not comment author
    if (!isOwner) return res.status(403).end();
  }

  await prisma.comment.delete({ where: { id: commentId } });
  res.status(204).end();
}

export default {
  getPostComments,
  getUserComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
};
