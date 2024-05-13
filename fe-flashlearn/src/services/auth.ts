const AUTH_STORAGE_TOKEN = `auth_token`;

const clearToken = () => {
  localStorage.removeItem(AUTH_STORAGE_TOKEN);
};

const setToken = (value: string) => {
  localStorage.setItem(AUTH_STORAGE_TOKEN, value);
};

const getTokenFromStorage = () => {
  return localStorage.getItem(AUTH_STORAGE_TOKEN);
};

// TODO:minh_luu implement force refreshToken

export default {
  clearToken,
  setToken,
  getTokenFromStorage,
};
