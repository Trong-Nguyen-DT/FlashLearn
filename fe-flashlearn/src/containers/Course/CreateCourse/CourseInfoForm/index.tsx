/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, PATHS } from '@appConfig';
import {
  CreatableSelect,
  FileUpload,
  ImagePreview,
  Input,
  Loading,
  UploadFileType,
} from '@components';
import { Box, Button, Stack } from '@mui/material';
import {
  CoursePayload,
  useAddCourse,
  useGetAllCourse,
  useGetMyLearningCourse,
  useGetMyTeachingCourse,
} from '@queries';
import { Toastify } from '@services';
import { Callback, getErrorMessage } from '@utils';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  CourseFormField,
  CourseFormSchema,
  courseInitialValues,
  courseStatusOptions,
} from './helpers';

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

  const { handleInvalidateMyTeachingCourseList } = useGetMyTeachingCourse();
  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();
  const { handleInvalidateCourseList } = useGetAllCourse();

  const { onAddNewCourse, isLoading } = useAddCourse({
    onSuccess(data) {
      Toastify.success('Tạo khoá học thành công');
      navigate(`${PATHS.courses}/${data.data.data.id}`);
      handleInvalidateMyTeachingCourseList();
      handleInvalidateMyLearningCourseList();
      handleInvalidateCourseList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
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
                  <CreatableSelect
                    label="Hãy chọn trạng thái cho lớp học của bạn"
                    placeholder="Chọn Trạng Thái Lớp Học"
                    required
                    size="small"
                    errorMessage={getFieldErrorMessage(CourseFormField.STATUS)}
                    {...getFieldProps(CourseFormField.STATUS)}
                    onChange={(_: any, value: any) => setFieldValue(CourseFormField.STATUS, value)}
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
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                sx={{
                  fontWeight: 800,
                  boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                  '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
                }}
              >
                Tiếp Tục
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={step !== 2 || isLoading}
                startIcon={isLoading && <Loading size="small" />}
                color="primary"
                sx={{
                  fontWeight: 800,
                  boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                  '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
                }}
              >
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
