import type { Request, Response } from 'express';

function getPostLikes(req: Request, res: Response) {
  res.status(418).end();
}

function getUserLikes(req: Request, res: Response) {
  res.status(418).end();
}

async function postLike(req: Request, res: Response) {
  res.status(418).end();
}

function deleteLike(req: Request, res: Response) {
  res.status(418).end();
}

export default { getPostLikes, getUserLikes, postLike, deleteLike };
