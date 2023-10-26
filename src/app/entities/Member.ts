import {Role} from "./Role";

export default interface Member{
  id: number;
  name: string;
  surname: string;
  phone?: string;
  nCaptaincies: number;
  role: Role;
  balance: number;
  injured: boolean;
}
