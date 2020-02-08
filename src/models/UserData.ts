export interface User {
  id: number,
  email: string,
  password_digest?: string
}

export interface UserData {
  status: string,
  logged_in?: boolean,
  user: User
}