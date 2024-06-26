import { COLOR_CODE, IMAGES } from '@appConfig';
import { PATHS } from '@appConfig/paths';
import { DialogContext, DialogType, Input, Link, Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LogoContainer from '../components/LogoContainer';
import { SignUpFormField, SignUpFormSchema, SignUpFormType, signUpInitialValues } from './helpers';
import { useSignUp, useVerifyEmail } from '@queries';
import { Toastify } from '@services';
import { useContext } from 'react';
import EmailConfirmationModal from '../components/EmailConfirmationModal';

const SignUp = () => {
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
            onCallBack={handleSignIn}
            encodeOTP={value.data.data.encodeOTP}
            isSignUp={true}
          />
        ),
        hideTitle: true,
        maxWidth: 'sm',
      });
      openModal();
    },
  });

  const { signup } = useSignUp({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
      closeModal();
    },
    onSuccess() {
      Toastify.success('Đăng ký tài khoản mới thành công.');
      navigate(PATHS.signIn);
      closeModal();
    },
  });

  const handleOnSubmit = (payload: SignUpFormType) => {
    verifyEmail({
      email: payload.email,
      isSignUp: true,
    });
  };

  const handleSignIn = (otp: string, encodeOTP: string) => {
    signup({
      email: values.email,
      name: values.name,
      password: values.password,
      otp,
      encodeOTP,
    });
  };

  const { touched, errors, getFieldProps, handleSubmit, values } = useFormik<SignUpFormType>({
    initialValues: signUpInitialValues,
    validationSchema: SignUpFormSchema,
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
                Tạo tài khoản mới
              </Typography>
              <Stack gap={3}>
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Email"
                  placeholder="Vui lòng nhập Email"
                  errorMessage={getFieldErrorMessage(SignUpFormField.EMAIL)}
                  {...getFieldProps(SignUpFormField.EMAIL)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Tên"
                  placeholder="Vui lòng nhập tên của bạn"
                  errorMessage={getFieldErrorMessage(SignUpFormField.NAME)}
                  {...getFieldProps(SignUpFormField.NAME)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Nhật khẩu"
                  placeholder="Vui lòng nhập mật khẩu"
                  isPassword
                  errorMessage={getFieldErrorMessage(SignUpFormField.PASSWORD)}
                  {...getFieldProps(SignUpFormField.PASSWORD)}
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
                ĐĂNG KÝ
              </Button>
              <Typography textAlign={'center'}>
                ĐÃ CÓ TÀI KHOẢN?{'   '}
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

export default SignUp;
