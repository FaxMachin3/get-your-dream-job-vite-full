import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../apis/auth';
import { applyJob } from '../apis/job';
import { editProfile, getAllApplicantsProfile, signUp } from '../apis/user';
import { STORE } from '../constants';

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  return useMutation(applyJob, {
    onSuccess: async () => {
      queryClient.invalidateQueries([STORE.SUB_STORE.JOBS]);
      queryClient.invalidateQueries([STORE.SUB_STORE.APPLIED_JOBS]);
    }
  });
};

export const useLoginUser = (setUserToken: (token: string | null) => void) => {
  return useMutation(loginUser, {
    onSuccess: ({ data }) => {
      setUserToken(data);
    }
  });
};

export const useEditProfileMutation = (
  setOpenEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation(editProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries([STORE.SUB_STORE.CURRENT_USER]);
      setOpenEditProfileModal(false);
    }
  });
};

export const useSignUp = (setUserToken: (token: string | null) => void) => {
  return useMutation(signUp, { onSuccess: ({ data }) => setUserToken(data) });
};

export const useGetAllApplicantsProfile = () => {
  return useMutation(getAllApplicantsProfile);
};
