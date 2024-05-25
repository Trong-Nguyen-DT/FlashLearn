/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';

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

  const leaveCourse = (payload: { id: string }) => {
    return api.patch(`${ApiKey.USERS}${ApiKey.STUDENT}/${payload.id}`);
  };

  const joinCourse = (payload: { id: string }) => {
    return api.put(`${ApiKey.USERS}${ApiKey.STUDENT}/${payload.id}`);
  };

  return { leaveCourse, joinCourse };
};

export default {
  create,
};
