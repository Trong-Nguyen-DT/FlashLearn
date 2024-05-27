export type ForgotPasswordPayload = {
  email: string;
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
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  phone: string;
}
