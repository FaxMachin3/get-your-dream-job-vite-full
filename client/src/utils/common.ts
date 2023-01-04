export function debounce<T extends Function>(func: T, delay: number = 100): T {
    let timer: string | number | NodeJS.Timeout | undefined;

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
