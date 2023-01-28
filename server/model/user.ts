import { IUser, IUserDetails } from '@_types/common-types.js';
import { Schema, model } from 'mongoose';

const UserDetails = new Schema<IUserDetails>({
  type: { type: String, required: true },
  contact: { type: String, unique: true },
  location: { type: String, default: '' },
  githubUsername: { type: String, default: '' },
  skills: { type: [String], default: [] },
  appliedTo: { type: [String], default: [] },
  companyName: { type: String }
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userDetails: {
    type: UserDetails,
    required: true
  }
});

UserSchema.index({ email: 1 }, { unique: true });

export default model<IUser>('users', UserSchema);
