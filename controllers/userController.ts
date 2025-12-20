import { Request, Response } from 'express';

function getUsers(req: Request, res: Response) {
  res.status(418).end();
}

function getUser(req: Request, res: Response) {
  res.status(418).end();
}

function postUser(req: Request, res: Response) {
  res.status(418).end();
}

function updateUser(req: Request, res: Response) {
  res.status(418).end();
}

function deleteUser(req: Request, res: Response) {
  res.status(418).end();
}

export default { getUsers, getUser, postUser, updateUser, deleteUser };
