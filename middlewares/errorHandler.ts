import type { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  res.status(500).end();
}

export default errorHandler;
