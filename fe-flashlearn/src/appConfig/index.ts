const configs = {
  API_URL: import.meta.env.VITE_API_URL,
  COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN,

  // firebase
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGE_TOKEN: import.meta.env.VITE_FIREBASE_MESSAGE_TOKEN,
};

const table = {
  ROWS_PER_PAGE: 10,
};

const common = {
  CONNECTION_TIMEOUT: 30000,
  MAXIMUM_FILE_SIZE: 1024 * 1024 * 50, // 50 MB
  WAITING_TIME: 5000, // 5 secs
  ANIMATION_TIME: 300,
  MAXIMUM_AVATAR_SIZE: 16 * 1024 * 1024, // 16MB
};

const textLength = {
  CODE_LENGTH: 16,
  TEXT_SHORT_LENGTH: 50,
  TEXT_MEDIUM_LENGTH: 100,
  TEXT_MAX_LENGTH: 255,
  VERIFICATION_CODE_LENGTH: 6,
};

export default {
  ...configs,
  ...common,
  ...table,
  ...textLength,
};

export * from './theme';
export * from './images';
export * from './sounds';
export * from './constants';
export * from './paths';
