import { Request, Response } from 'express';

function getPosts(req: Request, res: Response) {
  res.status(418).end();
}

function getPost(req: Request, res: Response) {
  res.status(418).end();
}

function postPost(req: Request, res: Response) {
  res.status(418).end();
}

function updatePost(req: Request, res: Response) {
  res.status(418).end();
}

function deletePost(req: Request, res: Response) {
  res.status(418).end();
}

export default { getPosts, getPost, postPost, updatePost, deletePost };
