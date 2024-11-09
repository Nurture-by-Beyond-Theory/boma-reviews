import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: mongoose.Types.ObjectId;
        role: string;
      };
    }
  }
}
