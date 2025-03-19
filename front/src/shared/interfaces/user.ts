export interface User {
  id: number
  username: string
  email: string
  role: 'employee' | 'manager' | 'admin';
  department: string
  password: string
  numcin: number
  profilePicture: string
}
