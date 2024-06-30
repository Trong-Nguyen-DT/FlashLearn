/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, IMAGES } from '@appConfig';
import { PATHS } from '@appConfig/paths';
import { Input, Link, LoadingContainer } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { useLogin } from '@queries';
import { AuthService, Toastify } from '@services';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LogoContainer from '../components/LogoContainer';
import { SignInFormField, SignInFormSchema, SignInFormType, signInInitialValues } from './helpers';

const SignIn = () => {
  const navigate = useNavigate();
  const handleOnSubmit = (payload: SignInFormType) => {
    login(payload);
  };

  const { touched, errors, getFieldProps, handleSubmit } = useFormik<SignInFormType>({
    initialValues: signInInitialValues,
    validationSchema: SignInFormSchema,
    onSubmit: handleOnSubmit,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { isLoading, login } = useLogin({
    onSuccess: (data) => {
      AuthService.setToken(data.accessToken);
      navigate(PATHS.root);
      window.location.reload();
    },
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  if (isLoading || !!AuthService.getTokenFromStorage()) {
    return <LoadingContainer />;
  }

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
          <Stack gap={4} alignItems={'center'} justifyContent={'center'}>
            <LogoContainer />
            <Stack sx={{ width: '500px' }} mt={2} gap={2}>
              <Stack gap={3}>
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Email"
                  placeholder="Enter your Email"
                  errorMessage={getFieldErrorMessage(SignInFormField.EMAIL)}
                  {...getFieldProps(SignInFormField.EMAIL)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Password"
                  placeholder="Enter your Password"
                  isPassword
                  errorMessage={getFieldErrorMessage(SignInFormField.PASSWORD)}
                  {...getFieldProps(SignInFormField.PASSWORD)}
                />
              </Stack>
            </Stack>
            <Stack width={'500px'} gap={3}>
              <Link onClick={() => navigate(PATHS.forgotPassword)}>
                <Typography
                  textAlign={'end'}
                  variant="h6"
                  color={COLOR_CODE.PRIMARY}
                  justifyContent={'end'}
                >
                  QUÊN MẬT KHẨU
                </Typography>
              </Link>
              <Button variant="contained" type="submit" fullWidth>
                ĐĂNG NHẬP
              </Button>
              <Typography textAlign={'center'}>
                CHƯA CÓ TÀI KHOẢN?{'   '}
                <Link onClick={() => navigate(PATHS.signUp)}>
                  <strong style={{ color: COLOR_CODE.PRIMARY }}>ĐĂNG KÝ NGAY</strong>
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default SignIn;
