/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AuthService } from '@services';
import { stringify } from '@utils';
import { TableParams } from '@components';
import { CoursePayload, RateCoursePayload } from './type';
import { entries } from 'lodash';

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

  const getMyLearningCourses = () => {
    return api.get(`${ApiKey.USERS}${ApiKey.COURSE}/study`);
  };

  const getMyTeachingCourses = () => {
    return api.get(`${ApiKey.USERS}${ApiKey.COURSE}`);
  };

  const createCourse = (body: CoursePayload) => {
    const { id: _, ...rest } = body;
    const payload = {
      ...rest,
      image: rest.image.file,
    };
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return api.post(`${ApiKey.USERS}${ApiKey.COURSE}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const rateCourse = (body: RateCoursePayload) => {
    return api.patch(`${ApiKey.USERS}${ApiKey.COURSE}`, body);
  };

  const deleteCourse = (body: { id: string }) => {
    const { id } = body;
    return api.delete(`${ApiKey.USERS}${ApiKey.COURSE}/${id}`, {});
  };

  return {
    getCourseList,
    getCourseDetail,
    createCourse,
    getMyLearningCourses,
    getMyTeachingCourses,
    deleteCourse,
    rateCourse,
  };
};

export default {
  create,
};
