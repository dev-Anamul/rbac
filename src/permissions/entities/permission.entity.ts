import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Resource } from 'src/common/enums/resources.enum';

@Schema()
export class Permission extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  action: string;

  @Prop({ type: String, enum: Resource, required: true })
  resource: Resource;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
