export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    RECRUITER_SIGN_UP: '/recruiter-sign-up',
    CANDIDATE_SIGN_UP: '/candidate-sign-up',
    JOB_LISTING: '/job-listing',
    PROFILE: '/profile',
    EDIT_PROFILE: '/edit-profile',
    CREATE_JOB: '/create-job',
    NAVBAR: '#navbar',
};

export const STORE = {
    APP_STORE: 'APP_STORE',
    SUB_STORE: {
        CURRENT_USER: 'CURRENT_USER',
        JOBS: 'JOBS',
        APPLIED_JOBS: 'APPLIED_JOBS',
        USER_REPOS: 'USER_REPOS',
        APPLICANTS: 'APPLICANTS',
    },
};

export const API_ROUTES = {
    HEALTH: '/health',
    LOGIN: '/api/v1/auth',
    JOB: {
        GET: '/api/v1/jobs',
        GET_APPLIED: '/api/v1/jobs/applied',
    },
    USER: {
        APPLY: '/api/v1/user/apply',
        GET_APPLICANTS_DATA: '/api/v1/user/all',
    },
};

export const API_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};

export const CUSTOM_HEADER = {
    AUTH: 'x-auth-token',
};

export enum USER_TYPE {
    CANDIDATE = 'CANDIDATE',
    RECRUITER = 'RECRUITER',
}

export const LOCAL_STORAGE = {
    CURRENT_USER: 'currentUser',
    _USERS: '_USERS',
    _JOBS: '_JOBS',
};

export type FilterType = {
    tags: Array<string>;
    minSalary: string;
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
    'Adobe XD',
];

export const _16KB = 16384;
export const _PAGE_SIZE = 10;
export const _TOTAL_JOBS = 150;
