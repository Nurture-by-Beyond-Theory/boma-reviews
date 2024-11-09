import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for the User schema
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'tenant' | 'landlord' | 'admin';  // Enumerated role values
  reviews: mongoose.Types.ObjectId[];
  lastLogin?: Date;
  warningCount?: number;
  createdAt?: Date;
  isSuspended?: boolean;
  suspensionReason?: string | null;
  suspensionExpiry?: Date | null;
  isBanned?: boolean;
}

// Mongoose schema with the defined interface
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['tenant', 'landlord', 'admin'],
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  lastLogin: { type: Date },
  warningCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isSuspended: { type: Boolean, default: false },
  suspensionReason: { type: String, default: null },
  suspensionExpiry: { type: Date, default: null },
  isBanned: { type: Boolean, default: false },
});

// Exporting the model with the IUser interface applied
const User = mongoose.model<IUser>('User', userSchema);
export default User;



