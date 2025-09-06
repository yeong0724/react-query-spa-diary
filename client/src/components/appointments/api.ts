import { Appointment } from '@shared/types';

import { axiosInstance } from '@/axiosInstance';

const removeAppointmentUser = async (
  appointment: Appointment
): Promise<void> => {
  const patchData = [{ op: 'remove', path: '/userId' }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
};

const setAppointmentUser = async (
  appointment: Appointment,
  userId: number | undefined
): Promise<void> => {
  if (!userId) return;

  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
};

export { removeAppointmentUser, setAppointmentUser };
