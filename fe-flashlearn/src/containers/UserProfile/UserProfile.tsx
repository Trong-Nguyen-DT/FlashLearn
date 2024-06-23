import { COLOR_CODE, NAVBAR_HEIGHT } from '@appConfig';
import { DialogContext, DialogType, Input, Loading } from '@components';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { ProfilePayload, useGetProfile, useUpdateProfile } from '@queries';
import { Toastify } from '@services';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { getShortName } from '../StartupContainers/NavBar/helpers';
import { ProfileFormField, ProfileFormSchema, ProfileToastMessage } from './helper';
import { RxAvatar } from 'react-icons/rx';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useContext } from 'react';
import ChangePassword from './components/ChangePassword';
import ChangeAvatar from './components/ChangeAvatar';

const UserProfile = () => {
  const { setDialogContent, openModal } = useContext(DialogContext);
  const { profile, isLoading, handleInvalidateProfile } = useGetProfile({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const { updateProfile, isLoading: isLoadingUpdate } = useUpdateProfile({
    onSuccess: () => {
      handleInvalidateProfile();
      Toastify.success(ProfileToastMessage.UPDATE_SUCCESS);
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleUpdateProfile = (formValue: ProfilePayload) => {
    updateProfile(formValue);
  };

  const { errors, touched, getFieldProps, handleSubmit, dirty } = useFormik<ProfilePayload>({
    initialValues: { email: profile.email, name: profile.name, phone: profile.phone },
    onSubmit: handleUpdateProfile,
    validationSchema: ProfileFormSchema,
    enableReinitialize: true,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleChangeAvatar = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: <ChangeAvatar url={profile?.avatar} />,
      hideTitle: true,
      maxWidth: 'sm',
    });
    openModal();
  };

  const handleChangePassword = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: <ChangePassword />,
      hideTitle: true,
      maxWidth: 'sm',
    });
    openModal();
  };

  if (isLoading || isLoadingUpdate) {
    return <Loading />;
  }

  return (
    <Stack
      sx={{
        width: '100%',
        mt: `${NAVBAR_HEIGHT}px`,
        py: 6,
        gap: 4,
      }}
    >
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_600} ml={4}>
        Hồ sơ của tôi
      </Typography>
      <Stack
        direction="row"
        sx={{
          width: '100%',
          gap: 4,
        }}
      >
        <Stack
          ml={4}
          padding={3}
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
          }}
          width={'30%'}
          gap={4}
          alignItems={'center'}
        >
          <Avatar
            sx={{ width: 300, height: 300, bgcolor: COLOR_CODE.PRIMARY, fontSize: 150 }}
            src={profile.avatar}
          >
            {getShortName(profile.name)}
          </Avatar>
          <Stack alignItems={'center'}>
            <Typography variant="h2" fontWeight={800}>
              {profile.name}
            </Typography>
            <Typography variant="h2">{profile.email}</Typography>
          </Stack>

          <Stack alignItems={'center'} gap={2}>
            <Button
              onClick={handleChangeAvatar}
              startIcon={<RxAvatar size={30} />}
              variant="contained"
              sx={{
                width: 300,
                fontSize: 24,
                height: 50,
                fontWeight: 800,
                boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
              }}
            >
              Đổi ảnh đại diện
            </Button>
            <Button
              onClick={handleChangePassword}
              startIcon={<RiLockPasswordFill size={30} />}
              variant="contained"
              sx={{
                width: 300,
                fontSize: 24,
                height: 50,
                fontWeight: 800,
                boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
              }}
            >
              Đổi mật khẩu
            </Button>
          </Stack>
        </Stack>
        <Stack
          mr={4}
          padding="24px"
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
          }}
          width={'70%'}
        >
          <Stack gap={6} p={4}>
            <form onSubmit={handleSubmit}>
              <Stack gap={3} justifyContent={'space-between'} flexDirection={'row'}>
                <Typography variant="h2" fontWeight={800}>
                  Thông tin cá nhân
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isLoadingUpdate}
                  startIcon={isLoadingUpdate && <Loading size="small" />}
                  sx={{
                    fontWeight: 800,
                    boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                    '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
                  }}
                >
                  Lưu
                </Button>
              </Stack>
              <Stack gap={4}>
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Tên"
                  placeholder="Nhập Tên của bạn"
                  errorMessage={getFieldErrorMessage(ProfileFormField.NAME)}
                  {...getFieldProps(ProfileFormField.NAME)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  errorMessage={getFieldErrorMessage(ProfileFormField.PHONE)}
                  {...getFieldProps(ProfileFormField.PHONE)}
                />
                <Input
                  required
                  fullWidth
                  size="small"
                  disabled
                  label="Email"
                  placeholder="Email"
                  errorMessage={getFieldErrorMessage(ProfileFormField.EMAIL)}
                  {...getFieldProps(ProfileFormField.EMAIL)}
                />
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
