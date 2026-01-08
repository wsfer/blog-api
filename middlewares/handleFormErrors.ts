import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Send form errors back to client. Should be used AFTER form validation
function handleFormErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  next();
}

export default handleFormErrors;
