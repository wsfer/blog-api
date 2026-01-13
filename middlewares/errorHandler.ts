import type { Request, Response, NextFunction } from 'express';
import type { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Database entry to update not found
  if ((err as PrismaClientKnownRequestError).code === 'P2025') {
    return res.status(404).end();
  }

  // Default behavior
  console.error(err);
  res.status(500).end();
}

export default errorHandler;
