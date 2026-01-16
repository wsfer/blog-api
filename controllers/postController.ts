import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import type { GetPostsQueryParams } from '../types/queryParams';
import { prisma } from '../lib/prisma';
import { matchedData } from 'express-validator';

const POSTS_PER_PAGE = 10;

async function getPosts(req: Request, res: Response) {
  const queryParams: GetPostsQueryParams = matchedData(req);
  const [count, posts] = await prisma.$transaction([
    prisma.post.count({
      where: {
        title: { contains: queryParams.title },
        content: { contains: queryParams.content },
      },
    }),
    prisma.post.findMany({
      take: POSTS_PER_PAGE,
      skip: (queryParams.page - 1) * POSTS_PER_PAGE,
      where: {
        title: { contains: queryParams.title },
        content: { contains: queryParams.content },
      },
      orderBy: { [queryParams.orderBy]: queryParams.order },
    }),
  ]);

  res.json({
    data: posts,
    pagination: {
      count: count,
      currentPage: queryParams.page,
      pageSize: POSTS_PER_PAGE,
    },
  });
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
