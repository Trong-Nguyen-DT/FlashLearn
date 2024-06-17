import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { ForgotPasswordPayload, SignInPayload, SignUpPayload, VerifyEmailPayload } from './type';
import { ApiKey } from '@queries/keys';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const login = (body: SignInPayload) => {
    return api.post(`${ApiKey.AUTH}/login`, body, {});
  };

  const signup = (body: SignUpPayload) => {
    return api.post(`${ApiKey.AUTH}/signup`, body, {});
  };

  const forgotPassword = (payload: ForgotPasswordPayload) => {
    return api.post(`${ApiKey.AUTH}/forgot-password`, payload);
  };

  const verifyEmail = (body: VerifyEmailPayload) => {
    return api.post(`${ApiKey.OTP}/generateOtp`, body, {});
  };

  return {
    login,
    signup,
    forgotPassword,
    verifyEmail,
  };
};

export default {
  create,
};
