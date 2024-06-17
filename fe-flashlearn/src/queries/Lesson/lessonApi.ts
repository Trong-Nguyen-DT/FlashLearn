/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { LessonPayload } from './type';
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

  const getLessonList = (id: string) => {
    return api.get(`${ApiKey.LESSON}?courseId=${id}`);
  };

  const getLessonDetail = (id: string) => {
    return api.get(`${ApiKey.LESSON}/${id}`);
  };

  const createLesson = (body: LessonPayload) => {
    const { id: _, ...rest } = body;
    const payload = {
      ...rest,
      image: rest.image.file,
    };
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    entries(payload).forEach(([key, value]) => {
      value && formData.append(key, value);
    });

    return api.post(`${ApiKey.USERS}${ApiKey.LESSON}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateLesson = (body: LessonPayload) => {
    const { id, ...rest } = body;
    const payload = {
      id,
      name: rest.name,
      description: rest.description,
      courseId: rest.courseId,
      ...(rest.image && { image: rest.image.file }),
    };
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    entries(payload).forEach(([key, value]) => {
      value && formData.append(key, value);
    });

    return api.put(`${ApiKey.USERS}${ApiKey.LESSON}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    getLessonList,
    getLessonDetail,
    createLesson,
    updateLesson,
  };
};

export default {
  create,
};
