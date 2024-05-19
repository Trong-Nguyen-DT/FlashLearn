/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AuthService } from '@services';
import { stringify } from '@utils';
import { TableParams } from '@components';
import { CoursePayload } from './type';

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

  const getCourseDetail = (id: string) => {
    return api.get(`${ApiKey.COURSE}/${id}`);
  };

  const createCourse = (body: CoursePayload) => {
    const { id: _, ...rest } = body;
    const payload = {
      ...rest,
      image: rest.image.file,
    };
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('status', payload.status);
    formData.append('image', payload.image);

    return api.post(`${ApiKey.USERS}${ApiKey.COURSE}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    getCourseList,
    getCourseDetail,
    createCourse,
  };
};

export default {
  create,
};
