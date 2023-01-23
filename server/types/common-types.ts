/**
 ** Job
 */

export interface IJob {
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

/**
 ** User
 */

export enum USER_TYPE {
  CANDIDATE = "CANDIDATE",
  RECRUITER = "RECRUITER",
}

export interface IUserDetails {
  type: USER_TYPE;
  contact?: string;
  location: string;
  githubUsername?: string;
  skills?: Array<string>;
  appliedTo?: Array<string>;
  companyName?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  userDetails: IUserDetails;
}
