/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, PATHS } from '@appConfig';
import {
  CreatableSelect,
  DialogContext,
  DialogType,
  FileUpload,
  ImagePreview,
  Input,
  Loading,
  UploadFileType,
} from '@components';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import {
  CoursePayload,
  CourseResponse,
  useDeleteCourse,
  useGetAllCourse,
  useGetMyLearningCourse,
  useGetMyTeachingCourse,
  useUpdateCourse,
} from '@queries';
import { Toastify } from '@services';
import { getErrorMessage } from '@utils';
import { Form, FormikProvider, useFormik } from 'formik';
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CourseFormField,
  CourseFormSchema,
  courseInitialValues,
  courseStatusOptions,
} from '../CreateCourse/CourseInfoForm/helpers';

type Props = {
  courseDetail: CourseResponse;
};

const UpdateCourse = ({ courseDetail }: Props) => {
  const navigate = useNavigate();

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const handleOnSubmit = (payload: CoursePayload) => {
    onUpdateNewCourse(payload);
  };

  const { handleInvalidateMyTeachingCourseList } = useGetMyTeachingCourse();
  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();
  const { handleInvalidateCourseList } = useGetAllCourse();

  const { onUpdateNewCourse, isLoading } = useUpdateCourse({
    onSuccess() {
      Toastify.success('Chỉnh sửa khoá học thành công');
      handleInvalidateMyTeachingCourseList();
      handleInvalidateMyLearningCourseList();
      handleInvalidateCourseList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const { onDeleteCourse } = useDeleteCourse({
    onSuccess() {
      Toastify.success('Xóa khóa học thành công');
      handleInvalidateCourseList();
      handleInvalidateMyTeachingCourseList();
      handleInvalidateMyLearningCourseList();
      navigate(PATHS.myCourseTeaching);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const INITIAL: CoursePayload = useMemo(() => {
    if (courseDetail) {
      return {
        description: courseDetail.description,
        id: courseDetail.id.toString(),
        image: { url: courseDetail.image },
        name: courseDetail.name,
        status: courseDetail.status,
      };
    }
    return courseInitialValues;
  }, [courseDetail]);

  const formik = useFormik<CoursePayload>({
    initialValues: INITIAL,
    validationSchema: CourseFormSchema,
    onSubmit: handleOnSubmit,
    enableReinitialize: true,
  });

  const { touched, errors, getFieldProps, handleSubmit, setFieldValue, values, dirty } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleRemoveImage = () => {
    setFieldValue(CourseFormField.IMAGE, null);
  };

  const handleDeleteCourse = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn có chắc chắn muốn xóa lớp học không? Hành động này sẽ không thể hoàn tác.',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Xóa',
      cancelText: 'Không! Đừng Xóa',
      onOk: () => {
        closeModal();
        onDeleteCourse({ id: courseDetail.id.toString() });
      },
    });
    openModal();
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        gap: 2,
        p: 4,
      }}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" my={1} width={'100%'} mb={4}>
            <Typography fontSize={24} fontWeight={800} width={'100%'}>
              Cài Đặt
            </Typography>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !dirty}
              startIcon={isLoading && <Loading size="small" />}
              color="primary"
              sx={{
                fontWeight: 800,
                boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
              }}
            >
              Lưu
            </Button>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              maxHeight: 550,
              gap: 4,
            }}
          >
            <Stack
              padding="24px"
              gap={2}
              sx={{
                border: `1px solid ${COLOR_CODE.GREY_300} `,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={800}>Ảnh lớp học</Typography>
              {values.image && (
                <ImagePreview
                  imageUrl={values.image?.url}
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
            </Stack>
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
                label="Hãy chọn trang thái cho lớp học của bạn"
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
          </Box>
          <Divider sx={{ my: 4 }} />
          <Stack direction="row" gap={4} alignItems={'center'}>
            <Typography fontSize={24} fontWeight={800}>
              Xóa khóa học:
            </Typography>
            <Button color="error" variant="outlined" onClick={handleDeleteCourse}>
              Xóa khóa học
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default UpdateCourse;
