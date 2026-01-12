import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

function getPosts(req: Request, res: Response) {
  res.status(418).end();
}

function getPost(req: Request, res: Response) {
  res.status(418).end();
}

async function postPost(req: Request, res: Response) {
  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      owner: {
        connect: { id: (req.user as User).id },
      },
    },
  });

  res.json(newPost);
}

function updatePost(req: Request, res: Response) {
  res.status(418).end();
}

function deletePost(req: Request, res: Response) {
  res.status(418).end();
}

export default { getPosts, getPost, postPost, updatePost, deletePost };
