import { IJob } from "@_types/common-types.js";
import { model, Schema } from "mongoose";

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
    validate: {
      validator: (str: string) => !!(str?.length >= 0),
      message: "Not valid string",
    },
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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

export default model<IJob>("jobs", JobSchema);
