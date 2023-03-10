/**
 ** Job
 */

export interface IJob {
  _id: string;
  companyName: string;
  title: string;
  contact: string;
  description: string;
  requirement: string;
  location: string;
  createdAt: Date;
  createdBy: string;
  salaryRange: { min: Number; max: Number };
  tags: Array<string>;
  applicants: Array<string>;
}

/**
 ** User
 */

export enum USER_TYPE {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER'
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
  _id: string;
  name: string;
  email: string;
  password: string;
  userDetails: IUserDetails;
}

/**
 ** App
 */

export enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export type FilterType = {
  tags: Array<string>;
  minSalary: string;
};

/**
 ** Stores
 */

export interface ThemeSlice {
  isDarkTheme: THEME.LIGHT | THEME.DARK;
  toggleTheme: () => void;
  resetThemeSlice: () => void;
}

export interface UserSlice {
  userToken: string | null;
  currentUser: Partial<IUser> | null;
  setUserToken: (token: string | null) => void;
  setCurrentUser: (user: Partial<IUser> | null) => void;
  resetUserSlice: () => void;
}

export interface AppSlice {
  jobFilter: FilterType;
  setTag: (tags: string[]) => void;
  setMinSalary: (minSalary: string) => void;
  resetAppSlice: () => void;
}
