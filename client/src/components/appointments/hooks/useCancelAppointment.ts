import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCustomToast } from '@/components/app/hooks/useCustomToast';
import { removeAppointmentUser } from '@/components/appointments/api';
import { queryKeys } from '@/react-query/constants';

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: removeAppointmentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({
        title: 'You have canceled the Appointment',
        status: 'warning',
      });
    },
  });

  return mutate;
}
