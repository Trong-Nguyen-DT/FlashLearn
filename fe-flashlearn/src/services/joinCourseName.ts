const COURSE_NAME_KEY = 'COURSE_NAME_KEY';

const clearValue = () => {
  sessionStorage.removeItem(COURSE_NAME_KEY);
};

const setValue = (value: string) => {
  sessionStorage.setItem(COURSE_NAME_KEY, value);
};

const getValue = () => {
  return sessionStorage.getItem(COURSE_NAME_KEY);
};

export default {
  COURSE_NAME_KEY,
  clearValue,
  setValue,
  getValue,
};
