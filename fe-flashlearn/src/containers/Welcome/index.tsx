/* eslint-disable react-refresh/only-export-components */
import { COLOR_CODE, IMAGES, NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { DialogContext, DialogType, Image, Loading, YesNoImageModal } from '@components';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  useAddStudents,
  useGetAllCourse,
  useGetCourseDetail,
  useGetMyLearningCourse,
  useGetProfile,
  useGetStudents,
} from '@queries';
import { IRootState } from '@redux/store';
import { CourseEmailService, CourseService, Toastify } from '@services';
import { useCallback, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WelcomeItem from './WelcomeItem';

type WelcomeProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const Welcome: React.FC<WelcomeProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { courses, setParams, isFetching } = useGetAllCourse();

  const { profile } = useGetProfile();

  const { courseDetail } = useGetCourseDetail({ id: CourseService.getValue() });

  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const { handleInvalidateStudentList } = useGetStudents();

  const { onAddNewStudents } = useAddStudents({
    onSuccess(data) {
      navigate(PATHS.courseDetail.replace(':courseId', data.data.data.id.toString()));
      CourseService.clearValue();
      CourseEmailService.clearValue();
      Toastify.success('Đăng ký khoá học thành công');
      handleInvalidateMyLearningCourseList();
      handleInvalidateStudentList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const joinCourse = useCallback((courseId: string) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: (
        <YesNoImageModal
          onYes={() => {
            onAddNewStudents({ courseId, emailStudents: [profile.email] });
            closeModal();
          }}
          onNo={() => closeModal()}
          title={`Bạn được mời tham gia khóa học ${courseDetail?.name}. Bạn sẽ tham gia chứ?`}
          image={IMAGES.raiseHand}
          yesText="Tham gia"
        />
      ),
      maxWidth: 'sm',
      hideTitle: true,
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const courseId = CourseService.getValue();
    const email = CourseEmailService.getValue();
    if (courseDetail && courseId && email === profile.email) {
      joinCourse(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, courseDetail]);

  useEffect(() => {
    setParams({ page: 1, perPage: 10, sort: 'rating:desc' });
  });

  const handleStart = () => {
    navigate(isAuthenticated ? PATHS.courses : PATHS.signIn);
  };

  if (isFetching) return <Loading variant="primary" />;

  return (
    <Stack
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        marginTop: `${NAVBAR_HEIGHT}px`,
        overflow: 'hidden',
      }}
    >
      <Image src={IMAGES.bannerHome} width={'100.55%'} />
      <Button
        variant="outlined"
        sx={{
          position: 'absolute',
          top: '35%',
          right: '20%',
          fontSize: 32,
          fontWeight: 700,
          height: 70,
          borderRadius: 20,
          boxShadow: `6px 6px 0px ${COLOR_CODE.PRIMARY_600}`,
          '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
        }}
        onClick={handleStart}
      >
        {isAuthenticated ? 'Khám phá nào' : 'Bắt đầu nào'}
      </Button>
      <Stack mx={9} my={4} overflow="hidden">
        {courses?.length > 0 ? (
          <>
            <Typography fontWeight={800} fontSize={32} color={COLOR_CODE.PRIMARY}>
              Những khóa học được đánh giá cao nhất
            </Typography>
            <Stack direction="row" gap={2} overflow="auto" height="400px">
              {courses.map((course, index) => (
                <Box key={index} width={300}>
                  <WelcomeItem course={course} />
                </Box>
              ))}
            </Stack>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default connect(mapStateToProps)(Welcome);
