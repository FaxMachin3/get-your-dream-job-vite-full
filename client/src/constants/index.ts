export const _16KB = 16384;
export const _PAGE_SIZE = 10;
export const _TOTAL_JOBS = 150;

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  RECRUITER_SIGN_UP: '/recruiter-sign-up',
  CANDIDATE_SIGN_UP: '/candidate-sign-up',
  JOB_LISTING: '/job-listing',
  PROFILE: '/profile',
  EDIT_PROFILE: '/edit-profile',
  CREATE_JOB: '/create-job',
  NAVBAR: '#navbar'
};

export const STORE = {
  APP_STORE: 'APP_STORE',
  SUB_STORE: {
    CURRENT_USER: 'CURRENT_USER',
    JOBS: 'JOBS',
    APPLIED_JOBS: 'APPLIED_JOBS',
    USER_REPOS: 'USER_REPOS',
    APPLICANTS: 'APPLICANTS'
  }
};

export const API_ROUTES = {
  V1: '/api/v1',
  HEALTH: '/health',
  LOGIN: '/auth',
  JOB: {
    GET: '/jobs',
    GET_APPLIED: '/jobs/applied',
    CREATE: '/jobs/add'
  },
  USER: {
    REGISTER: '/user',
    EDIT_PROFILE: '/user/update',
    APPLY: '/user/apply',
    GET_APPLICANTS_DATA: '/user/all'
  }
};

export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

export const CUSTOM_HEADER = {
  AUTH: 'x-auth-token'
};

export enum USER_TYPE {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER'
}

export const LOCAL_STORAGE = {
  CURRENT_USER: 'currentUser',
  _USERS: '_USERS',
  _JOBS: '_JOBS'
};

export const tagsOptions = [
  'CSS',
  'HTML',
  'Javascript',
  'React.js',
  'Typescript',
  'Next.js',
  'Ruby',
  'Dart',
  'MongoDB',
  'Python',
  'C++',
  'C#',
  'DSA',
  'System Design',
  'PHP',
  'SQL',
  'Node.js',
  'Nuxt.js',
  'C',
  'JAVA',
  'UI/UX',
  'Figma',
  'Adobe XD'
];

export enum ERROR {
  CHECK_CREDENTIALS = 'Please check your credentials.',
  CHECK_FORM_DATA = 'Please fill asterisk(*) marked fields',
  USER_EXISTS = 'This user is already registered.',
  PASSWORD_MISMATCH = 'Password mismatch!',
  INVALID_EMAIL = 'Invalid email!',
  INVALID_GITHUB = 'Invalid GitHub username!'
}

export enum INFO {
  APPLYING = 'Applying',
  FEATURE_INCOMING = 'Feature on the way!'
}

export enum SUCCESS {
  JOB_APPLIED = 'Applied!',
  JOB_CREATED = 'Job created!',
  PROFILE_SAVED = 'Profile saved!'
}
