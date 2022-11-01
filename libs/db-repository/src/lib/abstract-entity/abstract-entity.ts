import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class AbstractDocument {
  _id: Types.ObjectId
}