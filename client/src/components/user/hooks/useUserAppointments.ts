import { useQuery } from '@tanstack/react-query';

import type { Appointment } from '@shared/types';

import { useLoginData } from '@/auth/AuthContext';
import { getUserAppointments } from '@/components/user/api';
import { generateUserAppointmentsKey } from '@/react-query/keyFactories';

export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();
  const fallback: Appointment[] = [];

  const { data: userAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return userAppointments;
}
