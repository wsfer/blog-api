import type { Request, Response, NextFunction } from 'express';
import type { User, Role } from '../generated/prisma/client';
import passport from '../lib/passport';

// Returns a middleware for authentication and, optionally, authorization to protect routes
function authenticateUser(allowedRoles: Role[] | null = null) {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: User | null) => {
      if (err) return next(err);

      // Check if user is logged authenticated
      if (!user) return res.status(401).end();

      // Check if user can access the resource (optional)
      if (allowedRoles) {
        const isAllowed: boolean = allowedRoles.includes(user.role);

        if (!isAllowed) return res.status(403).end();
      }

      req.login(user, { session: false }, next);
    })(req, res, next);
  };
}

export default authenticateUser;
