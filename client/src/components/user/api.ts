import { AxiosResponse } from 'axios';
import jsonpatch from 'fast-json-patch';

import type { Appointment, User } from '@shared/types';

import { axiosInstance, getJWTHeader } from '@/axiosInstance';

const getUser = async (userId: number, userToken: string): Promise<User> => {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
};

const getUserAppointments = async (
  userId: number,
  userToken: string
): Promise<Appointment[] | null> => {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
};

const patchUserOnServer = async (
  newData: User | null,
  originalData: User | null
): Promise<User | null> => {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    }
  );
  return data.user;
};

export { getUser, getUserAppointments, patchUserOnServer };
