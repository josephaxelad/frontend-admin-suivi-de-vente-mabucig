export interface Admin {
  _id?: string;
  firstname: string;
  lastname: string;
  login: string;
  password?: string;
  picture?: string;
  role?: string;
  isDisabled?: boolean;
  // isDeleted?: Boolean;
}

enum Role{
  'admin',
  'superadmin',
}
