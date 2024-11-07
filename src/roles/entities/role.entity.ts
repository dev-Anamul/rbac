import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop([{ type: Types.ObjectId, ref: 'Permission' }])
  permissions: Types.ObjectId[];

  @Prop([String])
  attributes: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.pre('save', function (next) {
  if (this.isNew) this.id = this._id.toString();
  return next();
});
