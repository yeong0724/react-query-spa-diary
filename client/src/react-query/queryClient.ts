import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { toast } from '@/components/app/toast';

type CreateErrorTitleType = (
  errorMsg: string,
  actionType: 'fetch' | 'update'
) => string;

const createErrorTitle: CreateErrorTitleType = (errorMsg, actionType) => {
  const title = `could not ${actionType} data: ${
    errorMsg ?? 'error connecting to server'
  }`;
  return title;
};

const errorHandler = (errorMsg: string) => {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  const id = 'react-query-toast';

  if (!toast.isActive(id)) {
    toast({
      id,
      title: errorMsg,
      status: 'error',
      variant: 'subtle',
      isClosable: true,
    });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: ({ message = '' }) => {
      const errorMsg = createErrorTitle(message, 'fetch');
      errorHandler(errorMsg);
    },
  }),
  mutationCache: new MutationCache({
    onError: ({ message = '' }) => {
      const errorMsg = createErrorTitle(message, 'update');
      errorHandler(errorMsg);
    },
  }),
});

export { queryClient };
