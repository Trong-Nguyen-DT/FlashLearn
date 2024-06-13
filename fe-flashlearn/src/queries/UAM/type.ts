export type ForgotPasswordPayload = {
  email: string;
  password: string;
  otp: string;
  encodeOTP: string;
};

export type ChangePasswordPayload = {
  tokenResetPassword: string;
  newPassword: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};

export type SignUpResponse = SignInResponse;

export type SignUpPayload = {
  email: string;
  password: string;
  name: string;
  otp: string;
  encodeOTP: string;
};

export type VerifyEmailPayload = {
  email: string;
  isSignUp: boolean;
};

export type VerifyEmailResponse = {
  email: string;
  encodeOTP: string;
  otpExpiration: string;
};
