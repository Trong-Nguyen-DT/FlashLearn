import { DialogContext, FileUpload, ImagePreview, Loading, UploadFileType } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { ChangeAvatarPayload, useChangeAvatar, useGetProfile } from '@queries';
import { Toastify } from '@services';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { ChangeAvatarField, changeAvatarInitValue } from './helpers';

type ChangeAvatarProps = {
  url?: string;
};

const ChangeAvatar = ({ url }: ChangeAvatarProps) => {
  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateProfile } = useGetProfile();

  const { onChangeAvatar, isLoading } = useChangeAvatar({
    onSuccess() {
      Toastify.success('Đổi ảnh đại diện thành công');
      handleInvalidateProfile();
      closeModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const handleFormSubmit = (formValues: ChangeAvatarPayload) => {
    if (formValues.uploadFile.file) {
      onChangeAvatar(formValues);
    } else {
      closeModal();
    }
  };

  const { handleSubmit, values, setFieldValue } = useFormik<ChangeAvatarPayload>({
    initialValues: { ...changeAvatarInitValue, ...(url && { uploadFile: { url } }) },
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  const handleRemoveImage = () => {
    setFieldValue(ChangeAvatarField.UPLOAD_FILE, null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3} alignItems="center" width="100%">
        <Typography fontSize={24} fontWeight={700} width="100%">
          Đổi ảnh đại diện
        </Typography>
        {values.uploadFile && (
          <ImagePreview
            imageUrl={values.uploadFile?.url}
            image={values.uploadFile}
            onRemove={() => {
              handleRemoveImage();
            }}
            thumbnailWidth="300px"
            thumbnailHeight="300px"
          />
        )}
        {!values.uploadFile && (
          <Stack width={300}>
            <FileUpload
              onChange={async (value: UploadFileType[]) => {
                setFieldValue(ChangeAvatarField.UPLOAD_FILE, value[0]);
              }}
              onBlur={handleRemoveImage}
              acceptFileType={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
              numberAllow={1}
            />
          </Stack>
        )}
        <Stack
          width="100%"
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
            Lưu
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ChangeAvatar;
