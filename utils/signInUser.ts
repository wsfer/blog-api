import type { User } from '../generated/prisma/client';
import type { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'to_shut_up_typescript';
const JWT_OPTIONS: SignOptions = { expiresIn: '2h' };

function signInUser(user: User): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, JWT_OPTIONS, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export default signInUser;
