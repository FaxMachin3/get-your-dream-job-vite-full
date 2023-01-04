// Todo page load optimization
// Todo add debounce util

import { useCallback } from 'react';
import { debounce } from '../utils/common';

export function useDebounce<T extends Function>(
    func: T,
    delay: number = 100
): T {
    return useCallback(debounce(func, delay), []);
}
