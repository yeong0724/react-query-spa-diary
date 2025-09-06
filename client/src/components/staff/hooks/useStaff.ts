import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import type { Staff } from '@shared/types';

import { axiosInstance } from '@/axiosInstance';
import { filterByTreatment } from '@/components/staff/utils';
import { queryKeys } from '@/react-query/constants';

const getStaff = async (): Promise<Staff[]> => {
  const { data } = await axiosInstance.get('/staff');
  return data;
};

export function useStaff() {
  const [filter, setFilter] = useState<string>('all');

  const fallback: Staff[] = [];

  const selectHadlerByFilter = useCallback(
    (data: Staff[]) => {
      if (filter === 'all') return data;

      return filterByTreatment(data, filter);
    },
    [filter]
  );

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => selectHadlerByFilter(data),
    refetchOnWindowFocus: false,
  });

  return { staff, filter, setFilter };
}
