import type { Role } from '../generated/prisma/enums';

export interface GetPostsQueryParams {
  title: string | undefined;
  content: string | undefined;
  page: number;
  orderBy: 'title' | 'createdAt' | 'updatedAt';
  order: 'desc' | 'asc';
}

export interface GetUsersQueryParams {
  username: string | undefined;
  email: string | undefined;
  role: Role;
  page: number;
  orderBy: 'username' | 'email' | 'createdAt' | 'updatedAt';
  order: 'desc' | 'asc';
}
