import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Treatment } from '@shared/types';

import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';

const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};

const useTreatments = (): Treatment[] => {
  const fallback: Treatment[] = [];

  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });

  return data;
};

const usePrefetchTreatments = (): void => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });
};

export { usePrefetchTreatments, useTreatments };
