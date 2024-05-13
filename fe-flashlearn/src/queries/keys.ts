import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/user',
  AUTH = '/auth',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
