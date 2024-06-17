import { COLOR_CODE, IMAGES } from '@appConfig';
import { PATHS } from '@appConfig/paths';
import { DialogContext, DialogType, Input, Link, Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LogoContainer from '../components/LogoContainer';
import {
  ForgotPasswordFormField,
  ForgotPasswordFormSchema,
  ForgotPasswordFormType,
  forgotPasswordInitialValues,
} from './helpers';
import { useForgotPassword, useVerifyEmail } from '@queries';
import { Toastify } from '@services';
import { useContext } from 'react';
import EmailConfirmationModal from '../components/EmailConfirmationModal';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { verifyEmail, isLoading: isLoadingEmail } = useVerifyEmail({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(value) {
      Toastify.success('Mã xác nhận đã được gửi thành công đến email của bạn!');
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        data: (
          <EmailConfirmationModal
            email={values.email}
            onCallBack={handleForgotPassword}
            encodeOTP={value.data.data.encodeOTP}
            isSignUp={false}
          />
        ),
        hideTitle: true,
        maxWidth: 'sm',
      });
      openModal();
    },
  });

  const { forgotPassword } = useForgotPassword({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
      closeModal();
    },
    onSuccess() {
      Toastify.success('Đổi mật khẩu thành công.');
      navigate(PATHS.signIn);
      closeModal();
    },
  });

  const handleOnSubmit = (payload: ForgotPasswordFormType) => {
    verifyEmail({
      email: payload.email,
      isSignUp: false,
    });
  };

  const handleForgotPassword = (otp: string, encodeOTP: string) => {
    forgotPassword({
      email: values.email,
      password: values.password,
      otp,
      encodeOTP,
    });
  };

  const { touched, errors, getFieldProps, handleSubmit, values } =
    useFormik<ForgotPasswordFormType>({
      initialValues: forgotPasswordInitialValues,
      validationSchema: ForgotPasswordFormSchema,
      onSubmit: handleOnSubmit,
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  //   const { isLoading, login } = useLogin({
  //     onSuccess: (data) => {
  //       AuthService.setToken(data.accessToken);
  //       navigate(PATHS.root);
  //       window.location.reload();
  //     },
  //     onError: (error) => Toastify.error(error?.message),
  //   });

  //   if (isLoading || !!AuthService.getTokenFromStorage()) {
  //     return <LoadingContainer />;
  //   }

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#FEF1E1',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${IMAGES.banner})`,
        objectFit: 'fill',
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'white',
          width: 'fit-content',
          padding: 5,
          borderRadius: 8,
          border: `1px solid ${COLOR_CODE.GREY_200}`,
          boxShadow: '0px 4px 20px rgba(224, 224, 224, 0.5)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={3} alignItems={'center'} justifyContent={'center'}>
            <LogoContainer />
            <Stack sx={{ width: '500px' }} mt={2} gap={2}>
              <Typography textAlign={'center'} variant="h1" color={COLOR_CODE.GREY_700}>
                Quên mật khẩu
              </Typography>
              <Stack gap={3}>
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Email"
                  placeholder="Enter your Email"
                  errorMessage={getFieldErrorMessage(ForgotPasswordFormField.EMAIL)}
                  {...getFieldProps(ForgotPasswordFormField.EMAIL)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Password"
                  placeholder="Enter your Password"
                  isPassword
                  errorMessage={getFieldErrorMessage(ForgotPasswordFormField.PASSWORD)}
                  {...getFieldProps(ForgotPasswordFormField.PASSWORD)}
                />
              </Stack>
            </Stack>
            <Stack width={'500px'} gap={3}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                startIcon={isLoadingEmail && <Loading size="small" />}
              >
                ĐỔI MẬT KHẨU
              </Button>
              <Typography textAlign={'center'}>
                QUAY VỀ{'   '}
                <Link onClick={() => navigate(PATHS.signIn)}>
                  <strong style={{ color: COLOR_CODE.PRIMARY }}>ĐĂNG NHẬP</strong>
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
