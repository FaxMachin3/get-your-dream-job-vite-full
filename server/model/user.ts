import { IUser, IUserDetails } from '@_types/common-types.js';
import { Schema, model } from 'mongoose';

const UserDetails = new Schema<IUserDetails>({
  type: { type: String, required: true },
  contact: { type: String },
  location: { type: String, required: true },
  githubUsername: { type: String },
  skills: { type: [String] },
  appliedTo: { type: [String] },
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

export default model<IUser>('users', UserSchema);
