import { Schema, model } from 'mongoose';

enum USER_TYPE {
    CANDIDATE = 'CANDIDATE',
    RECRUITER = 'RECRUITER',
}

interface IUserDetails {
    type: USER_TYPE;
    contact?: string;
    location: string;
    githubUsername?: string;
    skills?: Array<string>;
    appliedTo?: Array<string>;
    companyName?: string;
}

interface IUser {
    name: string;
    email: string;
    password: string;
    userDetails: IUserDetails;
}

const UserDetails = new Schema<IUserDetails>({
    type: { type: String, required: true },
    contact: { type: String },
    location: { type: String, required: true },
    githubUsername: { type: String },
    skills: { type: [String] },
    appliedTo: { type: [String] },
    companyName: { type: String },
});

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userDetails: {
        type: UserDetails,
        required: true,
    },
});

export default model<IUser>('user', UserSchema);
