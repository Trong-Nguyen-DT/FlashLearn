const COURSE_EMAIL_KEY = 'COURSE_EMAIL_KEY';

const clearValue = () => {
  sessionStorage.removeItem(COURSE_EMAIL_KEY);
};

const setValue = (value: string) => {
  sessionStorage.setItem(COURSE_EMAIL_KEY, value);
};

const getValue = () => {
  return sessionStorage.getItem(COURSE_EMAIL_KEY);
};

export default {
  COURSE_EMAIL_KEY,
  clearValue,
  setValue,
  getValue,
};
