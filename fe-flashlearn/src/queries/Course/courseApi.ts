import { ApiKey } from '@queries/keys';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AuthService } from '@services';
import { stringify } from '@utils';
import { TableParams } from '@components';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //
  const token = AuthService.getTokenFromStorage();
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const getCourseList = (params: TableParams) => {
    const queryString = stringify(params);
    return api.get(`${ApiKey.COURSE}?${queryString}`);
  };

  // const getProductDetail = (id: string, storeId: string) => {
  //   const queryString = stringify({ storeId });
  //   return api.get(`${ApiKey.COURSE}/${id}?${queryString}`);
  // };

  return {
    getCourseList,
    // getProductDetail,
  };
};

export default {
  create,
};
