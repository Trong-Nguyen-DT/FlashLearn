import { COLOR_CODE } from '@appConfig';
import { DialogContext, Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { RateCoursePayload, useGetAllCourse, useGetCourseDetail, useRateCourse } from '@queries';
import { getErrorMessage } from '@utils';
import { useFormik } from 'formik';
import { useContext, useMemo } from 'react';
import {
  IconContainer,
  RatingFormField,
  RatingFormSchema,
  StyledRating,
  customIcons,
  ratingFormInitValue,
} from './helpers';
import { Toastify } from '@services';

type Props = {
  courseId?: number;
  rating?: number;
};

const RatingForm = ({ courseId, rating }: Props) => {
  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateCourseList } = useGetAllCourse();
  const { handleInvalidateCourseDetail } = useGetCourseDetail({ id: courseId.toString() });

  const { onRateCourse, isLoading } = useRateCourse({
    onSuccess() {
      handleInvalidateCourseList();
      handleInvalidateCourseDetail();
      Toastify.success('Đánh giá khoá học thành công');
      closeModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const getInitValue = useMemo(() => {
    if (rating) {
      return {
        id: courseId,
        rating,
      };
    }
    return { ...ratingFormInitValue, id: courseId };
  }, [rating, courseId]);

  const handleFormSubmit = (formValues: RateCoursePayload) => {
    onRateCourse(formValues);
  };

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { errors, touched, getFieldProps, handleSubmit } = useFormik<RateCoursePayload>({
    initialValues: getInitValue,
    onSubmit: handleFormSubmit,
    validationSchema: RatingFormSchema,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Typography fontSize={24} fontWeight={700}>
          Đánh giá khoá học
        </Typography>
        <StyledRating
          name="highlight-selected-only"
          defaultValue={2}
          IconContainerComponent={IconContainer}
          getLabelText={(value: number) => customIcons[value].label}
          highlightSelectedOnly
          {...getFieldProps(RatingFormField.RATING)}
          size="large"
          disabled={isLoading}
        />
        {getFieldErrorMessage(RatingFormField.RATING) && (
          <Typography color={COLOR_CODE.DANGER}>
            {getFieldErrorMessage(RatingFormField.RATING)}
          </Typography>
        )}
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
            {rating ? 'Lưu' : 'Đánh Giá'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default RatingForm;
