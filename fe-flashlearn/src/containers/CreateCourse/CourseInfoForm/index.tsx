/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE } from '@appConfig';
import { FileUpload, ImagePreview, Input, Select, UploadFileType } from '@components';
import { Box, Button, Stack } from '@mui/material';
import { CoursePayload, useAddCourse } from '@queries';
import { Callback, getErrorMessage } from '@utils';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  CourseFormField,
  CourseFormSchema,
  courseInitialValues,
  courseStatusOptions,
} from './helpers';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@appConfig';
import toastify from '@services/toastify';

type Props = {
  courseId?: string;
  isEditing?: boolean;
  step: number;
  setStep: Callback;
};

const CourseInfoForm: React.FC<Props> = ({ step, setStep }) => {
  const navigate = useNavigate();

  const handleOnSubmit = (payload: CoursePayload) => {
    onAddNewCourse(payload);
  };

  const { onAddNewCourse } = useAddCourse({
    onSuccess(data) {
      toastify.success('Tạo khoá học thành công');
      navigate(`${PATHS.courses}/${data.data.objectData.id}`);
    },
    onError(error) {
      toastify.success(error.message);
    },
  });

  const formik = useFormik<CoursePayload>({
    initialValues: courseInitialValues,
    validationSchema: CourseFormSchema,
    onSubmit: handleOnSubmit,
  });

  const { touched, errors, getFieldProps, handleSubmit, setFieldValue, values } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleRemoveImage = () => {
    setFieldValue(CourseFormField.IMAGE, null);
  };

  return (
    <Stack width={800}>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          {step === 1 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 550,
              }}
            >
              <Stack direction="row" justifyContent="space-between" padding="0px 24px 8px" gap={2}>
                <Stack
                  padding="24px"
                  gap={2}
                  sx={{
                    border: `1px solid ${COLOR_CODE.GREY_300} `,
                    borderRadius: 2,
                    width: '100%',
                  }}
                >
                  <Input
                    required
                    label="Tên Lớp Học của bạn là gì?"
                    errorMessage={getFieldErrorMessage(CourseFormField.NAME)}
                    placeholder="Nhập Tên Lớp Học"
                    fullWidth
                    multiline
                    size="small"
                    {...getFieldProps(CourseFormField.NAME)}
                  />
                  <Input
                    label="Hãy giới thiệu về lớp học của bạn"
                    errorMessage={getFieldErrorMessage(CourseFormField.DESCRIPTION)}
                    placeholder="Nhập Miêu Tả"
                    fullWidth
                    multiline
                    minRows={5}
                    size="small"
                    {...getFieldProps(CourseFormField.DESCRIPTION)}
                    InputProps={{
                      inputProps: {
                        maxLength: 255,
                      },
                    }}
                  />
                  <Select
                    label="Hãy chọn trang thái cho lớp học của bạn"
                    placeholder="Chọn Trạng Thái Lớp Học"
                    required
                    size="small"
                    errorMessage={getFieldErrorMessage(CourseFormField.STATUS)}
                    {...getFieldProps(CourseFormField.STATUS)}
                    onChange={(_, value) => setFieldValue(CourseFormField.STATUS, value)}
                    options={courseStatusOptions}
                    noOptionsText={'not found'}
                  />
                </Stack>
              </Stack>
            </Box>
          )}
          {step === 2 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 550,
                alignItems: 'center',
              }}
            >
              {values.image && (
                <ImagePreview
                  image={values.image}
                  onRemove={() => {
                    handleRemoveImage();
                  }}
                  thumbnailWidth="300px"
                  thumbnailHeight="300px"
                />
              )}
              {!values.image && (
                <Stack width={300}>
                  <FileUpload
                    onChange={async (value: UploadFileType[]) => {
                      setFieldValue(CourseFormField.IMAGE, value[0]);
                    }}
                    onBlur={handleRemoveImage}
                    acceptFileType={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                    numberAllow={1}
                  />
                </Stack>
              )}
            </Box>
          )}
          <Stack
            direction="row"
            justifyContent="end"
            alignItems="center"
            sx={{
              padding: '16px 24px 0px',
              gap: 2,
              borderRadius: '0 0 16px 16px',
            }}
          >
            {step === 1 && !!setStep ? (
              <Button variant="contained" color="primary" onClick={() => setStep(2)}>
                Tiếp Tục
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Tiếp Tục
              </Button>
            )}
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default CourseInfoForm;
