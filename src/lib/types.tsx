export type UserType = {
  groups: string[],
  username: string,
  isAdmin: boolean
  image?: string;
  [key: string]: any;
}

export type FetchUserType = {
  status?: number;
  data?: UserType;
  errors?: any;
};
