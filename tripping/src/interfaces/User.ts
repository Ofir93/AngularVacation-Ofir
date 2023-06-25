export type User = {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  liked: string[];
}

export type UserT = {
  userName: string;
  role: string;
  jwt: string;
  id?: number;
};
