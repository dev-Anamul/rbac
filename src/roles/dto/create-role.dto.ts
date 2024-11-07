import { Types } from 'mongoose';

export class CreateRoleDto {
  readonly name: string;
  readonly permissions: Types.ObjectId[];
  readonly attributes: string[];
}
