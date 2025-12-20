import { Request, Response } from 'express';

function getPostComments(req: Request, res: Response) {
  res.status(418).end();
}

function getUserComments(req: Request, res: Response) {
  res.status(418).end();
}

function getComment(req: Request, res: Response) {
  res.status(418).end();
}

function postComment(req: Request, res: Response) {
  res.status(418).end();
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
