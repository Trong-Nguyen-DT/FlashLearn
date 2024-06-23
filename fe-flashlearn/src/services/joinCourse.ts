const COURSE_ID_KEY = 'COURSE_ID_KEY';

const clearValue = () => {
  sessionStorage.removeItem(COURSE_ID_KEY);
};

const setValue = (value: string) => {
  sessionStorage.setItem(COURSE_ID_KEY, value);
};

const getValue = () => {
  return sessionStorage.getItem(COURSE_ID_KEY);
};

export default {
  COURSE_ID_KEY,
  clearValue,
  setValue,
  getValue,
};
