import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { useLoginData } from '@/auth/AuthContext';
import { axiosInstance } from '@/axiosInstance';
import {
  getMonthYearDetails,
  getNewMonthYear,
  MonthYear,
} from '@/components/appointments/hooks/monthYear';
import {
  AppointmentDateMap,
  GetAppointmentsType,
} from '@/components/appointments/types';
import { getAvailableAppointments } from '@/components/appointments/utils';
import { queryKeys } from '@/react-query/constants';

const fallback: AppointmentDateMap = {};

const commonOption = {
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
};

const getAppointments: GetAppointmentsType = async (year, month) => {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
};

const useAppointments = () => {
  const { userId } = useLoginData();
  const queryClient = useQueryClient();

  const currentMonthYear = getMonthYearDetails(dayjs());

  const [monthYear, setMonthYear] = useState<MonthYear>(currentMonthYear);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const { year: nextYear, month: nextMonth } = getNewMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [queryKeys.appointments, nextYear, nextMonth],
      queryFn: () => getAppointments(nextYear, nextMonth),
      ...commonOption,
    });
  }, [queryClient, monthYear]);

  const selectHadlerByShowAll = useCallback(
    (data: AppointmentDateMap, showAll: boolean) => {
      if (showAll) return data;

      return getAvailableAppointments(data, userId);
    },
    [userId]
  );

  const { data: appointments = fallback } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
    select: (data) => selectHadlerByShowAll(data, showAll),
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
    ...commonOption,
  });

  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  };

  return {
    appointments,
    monthYear,
    updateMonthYear,
    showAll,
    setShowAll,
  };
};

export { useAppointments };
