import { ROUTES } from '../constants';

export function debounce<T extends Function>(func: T, delay: number = 100): T {
    let timer: number | undefined;

    return ((...args: any[]) => {
        clearTimeout(timer);
        // @ts-ignore: Implicit type
        timer = setTimeout(() => (func as Function).apply(this, args), delay);
    }) as any;
}

export const validateEmail = (email: string) => {
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
};

export const navLinksWrapper = ({
    onLogout,
}: {
    onLogout?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
    const NAVS = {
        BRAND: 'GYDJ',
        USER_NAVS: [
            {
                title: 'Jobs',
                to: ROUTES.JOB_LISTING,
            },
            {
                title: 'Profile',
                to: ROUTES.PROFILE,
            },
            {
                title: 'Logout',
                to: ROUTES.ROOT,
                onClick: onLogout,
            },
        ],
        NON_USER_NAVS: [
            {
                title: 'Login',
                to: ROUTES.LOGIN,
            },
            {
                title: 'Register',
                to: ROUTES.CANDIDATE_SIGN_UP,
            },
        ],
    };

    return NAVS;
};
