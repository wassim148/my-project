export interface User {
  id: number
  username: string
  email: string
  role: 'employe' | 'admin'
  password: string
  numcin: number
  profilePicture: string
}
