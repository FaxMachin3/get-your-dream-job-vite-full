import { model, Schema } from 'mongoose';

interface IJob {
    id: string;
    companyName: string;
    title: string;
    contact: string;
    description: string;
    requirement: string;
    location: string;
    createdAt: Date;
    createdBy: string;
    salaryRange: [number, number];
    tags: Array<string>;
    applicants: Array<string>;
}

const JobSchema = new Schema<IJob>({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    salaryRange: {
        type: [Number, Number],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    applicants: {
        type: [String],
        required: true,
    },
});

export default model<IJob>('job', JobSchema);
