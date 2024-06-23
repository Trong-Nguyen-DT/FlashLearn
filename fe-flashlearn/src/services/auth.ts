const AUTH_STORAGE_TOKEN = `auth_token`;

const clearToken = () => {
  localStorage.removeItem(AUTH_STORAGE_TOKEN);
};

const setToken = async (value: string) => {
  await localStorage.setItem(AUTH_STORAGE_TOKEN, value);
};

const getTokenFromStorage = () => {
  return localStorage.getItem(AUTH_STORAGE_TOKEN);
};

export default {
  clearToken,
  setToken,
  getTokenFromStorage,
};
