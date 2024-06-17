import { ApiKey } from '@queries/keys';
import { AuthService } from '@services';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { ChangeAvatarPayload, ChangePasswordPayload, ProfilePayload } from './type';
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

  const getProfile = () => {
    return api.get(`${ApiKey.USERS}`, {});
  };

  const updateProfile = (body: ProfilePayload) => {
    return api.put(`${ApiKey.USERS}`, body, {});
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return api.patch(`${ApiKey.USERS}/change-password`, body, {});
  };

  const changeAvatar = (body: ChangeAvatarPayload) => {
    const payload = {
      uploadFile: body.uploadFile.file,
    };
    // eslint-disable-next-line prefer-const
    let formData = new FormData();

    entries(payload).forEach(([key, value]) => {
      value && formData.append(key, value);
    });

    return api.patch(`${ApiKey.USERS}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    getProfile,
    changePassword,
    updateProfile,
    changeAvatar,
  };
};

export default {
  create,
};
