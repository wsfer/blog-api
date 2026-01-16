export interface GetPostsQueryParams {
  title: string | undefined;
  content: string | undefined;
  page: number;
  orderBy: 'title' | 'createdAt' | 'updatedAt';
  order: 'desc' | 'asc';
}
