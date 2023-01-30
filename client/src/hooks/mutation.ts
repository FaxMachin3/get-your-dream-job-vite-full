import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { loginUser } from '../apis/auth';
import { applyJob, createJob } from '../apis/job';
import { editProfile, getAllApplicantsProfile, signUp } from '../apis/user';
import { INFO, STORE, SUCCESS } from '../constants';

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  return useMutation(applyJob, {
    onMutate: async () => {
      message.loading({ content: INFO.APPLYING });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries([STORE.SUB_STORE.JOBS]);
      queryClient.invalidateQueries([STORE.SUB_STORE.APPLIED_JOBS]);
      message.destroy();
      message.success({ content: SUCCESS.JOB_APPLIED });
    }
  });
};

export const useLoginUser = (setUserToken: (token: string | null) => void) => {
  return useMutation(loginUser, {
    onSuccess: ({ data }) => {
      setUserToken(data);
    },
    onError: (error: any) => {
      message.error({ content: error.response.data.error ?? error.message });
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
      message.success({ content: SUCCESS.PROFILE_SAVED });
      setOpenEditProfileModal(false);
    }
  });
};

export const useSignUp = (setUserToken: (token: string | null) => void) => {
  return useMutation(signUp, {
    onSuccess: ({ data }) => setUserToken(data),
    onError: (error: any) => {
      message.error({ content: error.response.data.error ?? error.message });
    }
  });
};

export const useGetAllApplicantsProfile = () => {
  return useMutation(getAllApplicantsProfile);
};

export const useCreateJob = (
  setOpenCreateJobModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation(createJob, {
    onSuccess: () => {
      queryClient.invalidateQueries([STORE.SUB_STORE.JOBS]);
      message.success({ content: SUCCESS.JOB_CREATED });
      setOpenCreateJobModal(false);
    }
  });
};
