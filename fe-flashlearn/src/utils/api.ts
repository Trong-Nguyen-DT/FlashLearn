/* eslint-disable @typescript-eslint/no-explicit-any */
import toastify from '@services/toastify';
import { isEmpty } from './validation';

type ApiCall = (..._args: any[]) => Promise<any>;

// using to passing params to api url
export const stringify = (
  params: { [key: string]: number | string | string[] | boolean },
  excludeKey: string[] = [],
) => {
  let result = '';

  if (!params) return '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[`${key}`]) || excludeKey.includes(`${key}`)) {
      if (Array.isArray(params[`${key}`])) {
        const array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.ok) res(response.data);
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        toastify.error('Connection timeout. Please check your network and try again.');
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export interface ApiResponseType<T> {
  data: {
    objectData: T;
  };
  code: number;
  success: boolean;
  timestamp: string;
}

export interface PaginationResponseType<T> {
  data: {
    arrayData: T[];
    page: {
      currentPage: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

export interface ErrorResponseType {
  cause: string;
  errorCode: number;
  errorMessage: string;
  message: string;
}
