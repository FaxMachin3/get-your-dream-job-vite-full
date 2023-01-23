import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../apis/auth';

export const useLoginUser = (setUserToken: (token: string | null) => void) => {
  return useMutation(loginUser, {
    onSuccess: ({ data }) => {
      setUserToken(data);
    }
  });
};
