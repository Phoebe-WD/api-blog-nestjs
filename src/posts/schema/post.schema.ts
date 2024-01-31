import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  contentBody: string;
  @Prop({ type: String, default: null })
  img: string;
  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  author: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
