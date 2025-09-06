import type { Appointment } from '@shared/types';

export type AppointmentDateMap = Record<number, Appointment[]>;

export type GetAppointmentsType = (
  year: string,
  month: string
) => Promise<AppointmentDateMap>;

export type SetAppointmentUserType = (
  appointment: Appointment,
  userId: number | undefined
) => Promise<void>;

export type RemoveAppointmentUserType = (
  appointment: Appointment
) => Promise<void>;
