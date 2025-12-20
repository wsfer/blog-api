import { Request, Response } from 'express';

function getProfile(req: Request, res: Response) {
  res.status(418).end();
}

function postLogin(req: Request, res: Response) {
  res.status(418).end();
}

function postRegister(req: Request, res: Response) {
  res.status(418).end();
}

function postLogout(req: Request, res: Response) {
  res.status(418).end();
}

export default { getProfile, postLogin, postRegister, postLogout };
