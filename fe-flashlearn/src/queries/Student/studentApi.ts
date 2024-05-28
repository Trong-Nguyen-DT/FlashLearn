/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AddStudentPayload, RemoveStudentPayload } from './type';

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

  const getStudentList = (id: string) => {
    return api.get(`${ApiKey.USERS}${ApiKey.STUDENT}?courseId=${id}`);
  };

  const addStudent = (body: AddStudentPayload) => {
    return api.post(`${ApiKey.USERS}${ApiKey.STUDENT}`, body);
  };

  const deleteStudent = (body: RemoveStudentPayload) => {
    const { courseId, studentId } = body;
    return api.delete(`${ApiKey.USERS}${ApiKey.STUDENT}/${courseId}/${studentId}`, {});
  };

  return { leaveCourse, joinCourse, getStudentList, addStudent, deleteStudent };
};

export default {
  create,
};
