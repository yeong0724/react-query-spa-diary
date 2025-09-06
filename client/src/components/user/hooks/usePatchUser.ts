import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from '@shared/types';

import { useCustomToast } from '@/components/app/hooks/useCustomToast';
import { patchUserOnServer } from '@/components/user/api';
import { useUser } from '@/components/user/hooks/useUser';
import { queryKeys } from '@/react-query/constants';

export const MUTATION_KEY = 'patch-user';

export function usePatchUser() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const toast = useCustomToast();

  const { mutate: patchUser } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (updateUser: User) => patchUserOnServer(updateUser, user),
    onSuccess: () => {
      toast({
        title: 'User information updated successfully',
        status: 'success',
      });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });

  return patchUser;
}
