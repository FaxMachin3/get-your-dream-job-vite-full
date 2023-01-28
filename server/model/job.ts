import { IJob } from '@_types/common-types.js';
import { model, Schema } from 'mongoose';

const JobSchema = new Schema<IJob>({
  companyName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  createdBy: {
    type: String,
    required: true
  },
  salaryRange: {
    type: [Number, Number],
    required: true,
    default: [0, Number.MAX_SAFE_INTEGER]
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  applicants: {
    type: [String],
    required: true,
    default: []
  }
});

JobSchema.index({ createdAt: 1, createdBy: 1 }, { unique: true });

export default model<IJob>('jobs', JobSchema);
