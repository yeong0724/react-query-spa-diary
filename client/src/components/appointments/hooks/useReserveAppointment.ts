import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Appointment } from '@shared/types';

import { useLoginData } from '@/auth/AuthContext';
import { useCustomToast } from '@/components/app/hooks/useCustomToast';
import { setAppointmentUser } from '@/components/appointments/api';
import { queryKeys } from '@/react-query/constants';

export const useReserveAppointment = () => {
  const queryClient = useQueryClient();
  const { userId } = useLoginData();
  const toast = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: (appointment: Appointment) =>
      setAppointmentUser(appointment, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({ title: 'You have reserved an Appointment', status: 'success' });
    },
  });

  return mutate;
};
