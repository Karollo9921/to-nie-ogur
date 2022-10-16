import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaTypes as S, Types } from "mongoose";

@Schema({ timestamps: true })
export class AbstractDocument {
  @Prop({ type: S.ObjectId })
  _id: Types.ObjectId
}