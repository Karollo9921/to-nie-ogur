import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/db-repository/src/lib/abstract-entity/abstract-entity';

@Schema()
export class User extends AbstractDocument {
  @Prop()
  login: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 1000 })
  rating?: number;

  @Prop({ default: 0 })
  numOfGames?: number;

  @Prop({ unique: true, index: true })
  id?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);