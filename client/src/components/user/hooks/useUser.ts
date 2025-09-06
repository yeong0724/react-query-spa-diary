import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { User } from '@shared/types';

import { useLoginData } from '@/auth/AuthContext';
import { getUser } from '@/components/user/api';
import { queryKeys } from '@/react-query/constants';
import { generateUserKey } from '@/react-query/keyFactories';

export function useUser() {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: generateUserKey(userId),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  const updateUser = (newUser: User): void => {
    const { id } = newUser;
    queryClient.setQueryData(generateUserKey(id), newUser);
  };

  const clearUser = () => {
    queryClient.removeQueries({ queryKey: [queryKeys.user] });

    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user],
    });
  };

  return { user, updateUser, clearUser };
}
