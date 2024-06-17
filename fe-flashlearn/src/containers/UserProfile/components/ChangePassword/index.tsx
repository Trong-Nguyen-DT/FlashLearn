import { DialogContext, Input, Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { ChangePasswordPayload, useChangePassword } from '@queries';
import { Toastify } from '@services';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { ChangePasswordField, ChangePasswordSchema, changePasswordInitValue } from './helpers';

const ChangePassword = () => {
  const { closeModal } = useContext(DialogContext);

  const { changePassword, isLoading } = useChangePassword({
    onSuccess() {
      Toastify.success('Đổi mật khẩu thành công');
      closeModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const handleFormSubmit = (formValues: ChangePasswordPayload) => {
    changePassword(formValues);
  };

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { errors, touched, getFieldProps, handleSubmit } = useFormik<ChangePasswordPayload>({
    initialValues: changePasswordInitValue,
    onSubmit: handleFormSubmit,
    validationSchema: ChangePasswordSchema,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Typography fontSize={24} fontWeight={700}>
          Đổi mật khẩu
        </Typography>
        <Input
          required
          fullWidth
          size="small"
          label="Mật Khẩu Cũ"
          placeholder="Nhập Mật Khẩu cũ"
          errorMessage={getFieldErrorMessage(ChangePasswordField.OLD_PASSWORD)}
          {...getFieldProps(ChangePasswordField.OLD_PASSWORD)}
        />
        <Input
          required
          fullWidth
          size="small"
          label="Mật Khẩu Mới"
          placeholder="Nhập Mật Khẩu Mới"
          errorMessage={getFieldErrorMessage(ChangePasswordField.NEW_PASSWORD)}
          {...getFieldProps(ChangePasswordField.NEW_PASSWORD)}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: '8px 0px',
            gap: 2,
            borderRadius: '0 0 16px 16px',
          }}
        >
          <Button variant="outlined" color="inherit" onClick={closeModal} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            color="primary"
            startIcon={isLoading && <Loading size="small" />}
          >
            Đổi Mật Khẩu
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ChangePassword;
