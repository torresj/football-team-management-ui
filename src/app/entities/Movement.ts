import {MovementType} from "./MovementType";

export default interface Movement{
  id: number;
  type: MovementType;
  memberName: string;
  amount: number;
  description: string;
  createdOn: Date;
}
