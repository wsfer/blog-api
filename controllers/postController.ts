import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

function getPosts(req: Request, res: Response) {
  res.status(418).end();
}

async function getPost(req: Request, res: Response) {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return res.status(404).end();
  }

  res.json(post);
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

  res.status(201).json(newPost);
}

async function updatePost(req: Request, res: Response) {
  const { postId } = req.params;
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date(),
    },
  });

  res.json(updatedPost);
}

async function deletePost(req: Request, res: Response) {
  const { postId } = req.params;
  await prisma.post.delete({ where: { id: postId } });
  res.status(204).end();
}

export default { getPosts, getPost, postPost, updatePost, deletePost };
