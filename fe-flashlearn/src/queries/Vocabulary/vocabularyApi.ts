/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { VocabulariesOfLessonPayload, VocabulariesPayload, VocabularyPayload } from './type';
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

  const getVocabularyOfLesson = (lessonId: string) => {
    return api.get(`${ApiKey.VOCABULARY}/${lessonId}`);
  };

  const getAllVocabulary = () => {
    return api.get(`${ApiKey.VOCABULARY}`);
  };

  const createVocabulary = (body: VocabularyPayload) => {
    return api.post(`${ApiKey.USERS}${ApiKey.VOCABULARY}/create-vocabulary`, body);
  };

  const createVocabularies = (body: VocabulariesPayload) => {
    return api.post(`${ApiKey.USERS}${ApiKey.VOCABULARY}/create-vocabularies`, body);
  };

  const addVocabulariesOfLesson = (body: VocabulariesOfLessonPayload) => {
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    formData.append('lessonId', body.lessonId.toString());

    body.vocabularies.forEach((vocabulary, index) => {
      const prefix = `vocabularies[${index}].`;
      const payload = {
        id: vocabulary.id?.toString() || null,
        meaning: vocabulary.meaning,
        vocabularyId: vocabulary.vocabularyId.toString(),
        ...(vocabulary.delete && { delete: 'true' }),
        ...(vocabulary.image && { image: vocabulary.image.file }),
      };
      entries(payload).forEach(([key, value]) => {
        value && formData.append(prefix + key, value);
      });
    });

    return api.post(`${ApiKey.USERS}${ApiKey.VOCABULARY}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateVocabulariesOfLesson = (body: VocabulariesOfLessonPayload) => {
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    formData.append('lessonId', body.lessonId.toString());

    body.vocabularies.forEach((vocabulary, index) => {
      const prefix = `inputs[${index}].`;
      const payload = {
        id: vocabulary.id?.toString() || null,
        meaning: vocabulary.meaning,
        vocabularyId: vocabulary.vocabularyId.toString(),
        ...(vocabulary.image && { image: vocabulary.image.file }),
      };
      entries(payload).forEach(([key, value]) => {
        value && formData.append(prefix + key, value);
      });
    });

    return api.put(`${ApiKey.USERS}${ApiKey.VOCABULARY}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    getVocabularyOfLesson,
    getAllVocabulary,
    createVocabulary,
    createVocabularies,
    addVocabulariesOfLesson,
    updateVocabulariesOfLesson,
  };
};

export default {
  create,
};
