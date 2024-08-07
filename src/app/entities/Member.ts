import { Role } from './Role';

export default interface Member {
  id: number;
  name: string;
  alias?: string;
  surname: string;
  phone?: string;
  nCaptaincies: number;
  role: Role;
  balance: number;
  injured: boolean;
  blocked: boolean;
}
