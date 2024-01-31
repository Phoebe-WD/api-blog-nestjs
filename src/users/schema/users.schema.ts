import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLES } from '../../helpers/enum/roles.enum';
import { PostSchema, Posts } from 'src/posts/schema/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Invalid email format. Please enter a valid email address.',
    ],
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: null })
  img: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, enum: ROLES, required: true, default: ROLES.USER })
  role: ROLES;

  @Prop([PostSchema])
  posts: Posts[];
}

export const UserSchema = SchemaFactory.createForClass(User);
