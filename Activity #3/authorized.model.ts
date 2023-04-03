import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorizedDocument = Authorized & Document;

@Schema()
export class Authorized{
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  position: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const AuthorizedSchema = SchemaFactory.createForClass(Authorized);