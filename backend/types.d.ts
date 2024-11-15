import { IUser } from './models/user.model';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;  // Ensures that req.user has the IUser properties, including _id
    }
  }
}

