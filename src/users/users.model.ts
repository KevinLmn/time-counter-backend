import { PostModel } from 'src/posts/post.model';

export type UserModel = {
  id: number;
  email: string;
  name: string | null;
  posts?: PostModel[];
};
