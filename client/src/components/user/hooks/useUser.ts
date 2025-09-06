import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { User } from '@shared/types';

import { useLoginData } from '@/auth/AuthContext';
import { axiosInstance, getJWTHeader } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';
import { generateUserKey } from '@/react-query/keyFactories';

type GetUserType = (userId: number, userToken: string) => Promise<User>;

const getUser: GetUserType = async (userId, userToken) => {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
};

export function useUser() {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  const updateUser = (newUser: User): void => {
    const { id, token = '' } = newUser;
    queryClient.setQueryData(generateUserKey(id, token), newUser);
  };

  function clearUser() {
    queryClient.removeQueries({ queryKey: [queryKeys.user] });

    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user],
    });
  }

  return { user, updateUser, clearUser };
}
