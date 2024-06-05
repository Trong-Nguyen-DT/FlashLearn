/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { updateLearnProgressPayload } from './type';

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

  const getQuestionLearn = (id: string) => {
    return api.get(`${ApiKey.USERS}${ApiKey.LEARN}${ApiKey.LESSON}/${id}`);
  };

  const getQuestionPracticeLesson = (id: string) => {
    return api.get(`${ApiKey.USERS}${ApiKey.PRACTICE}${ApiKey.LESSON}/${id}`);
  };

  const getQuestionPracticeCourse = (id: string) => {
    return api.get(`${ApiKey.USERS}${ApiKey.PRACTICE}${ApiKey.COURSE}/${id}`);
  };

  const updateLearnProgress = (payload: updateLearnProgressPayload) => {
    const { courseId, ...body } = payload;
    return api.post(`${ApiKey.USERS}${ApiKey.LEARN}/${courseId}`, body);
  };

  return {
    getQuestionLearn,
    getQuestionPracticeLesson,
    updateLearnProgress,
    getQuestionPracticeCourse,
  };
};

export default {
  create,
};
