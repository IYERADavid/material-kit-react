export interface User {
  id: number,
  names: string,
  email: string,
  user_type: number,
  phone: string | undefined,
  token: string,
  isOnline: string,
  savedDate: string

  [key: string]: unknown;
}

export interface  updateUser {
  userId: number,
  names: string,
  email: string,
  phone: string,
}
