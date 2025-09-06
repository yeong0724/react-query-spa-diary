import type { Appointment } from "@shared/types";

export type AppointmentDateMap = Record<number, Appointment[]>;

export type GetAppointmentsType = (
  year: string,
  month: string
) => Promise<AppointmentDateMap>;
