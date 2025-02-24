import { Role } from '../enums/role.enum';

export type CurrentUser = {
  id: number;
  username: string;
  role: Role;
};
