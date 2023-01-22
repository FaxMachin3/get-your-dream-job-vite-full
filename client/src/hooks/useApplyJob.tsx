import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyJob } from '../apis/job';
import { STORE } from '../constants';

export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation(applyJob, {
        onSuccess: async () => {
            queryClient.invalidateQueries([STORE.SUB_STORE.JOBS]);
            queryClient.invalidateQueries([STORE.SUB_STORE.APPLIED_JOBS]);
        },
    });
};
