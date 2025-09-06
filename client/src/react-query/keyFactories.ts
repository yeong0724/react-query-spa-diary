import { queryKeys } from '@/react-query/constants';

const generateUserKey = (userId: number, userToken: string) => {
  return [queryKeys.user, userId, userToken];
};

const generateUserAppointmentsKey = (userId: number, userToken: string) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
};

export { generateUserAppointmentsKey, generateUserKey };
