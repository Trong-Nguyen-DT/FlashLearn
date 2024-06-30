/* eslint-disable react-refresh/only-export-components */
import { COLOR_CODE, IMAGES, NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { DialogContext, DialogType, Image, Loading, YesNoImageModal } from '@components';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  useAddStudents,
  useGetAllCourse,
  useGetMyLearningCourse,
  useGetProfile,
  useGetStudents,
} from '@queries';
import { IRootState } from '@redux/store';
import { CourseEmailService, CourseNameService, CourseService, Toastify } from '@services';
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

  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const { handleInvalidateStudentList } = useGetStudents();

  const { onAddNewStudents } = useAddStudents({
    onSuccess() {
      const courseId = CourseService.getValue();
      navigate(PATHS.courseDetail.replace(':courseId', courseId));
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

  const joinCourse = useCallback(
    (courseId: string, courseName: string) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        data: (
          <YesNoImageModal
            onYes={() => {
              onAddNewStudents({ courseId, email: profile.email });
              closeModal();
            }}
            onNo={() => closeModal()}
            title={`Bạn được mời tham gia khóa học ${courseName || ''}. Bạn sẽ tham gia chứ?`}
            image={IMAGES.raiseHand}
            yesText="Tham gia"
          />
        ),
        maxWidth: 'sm',
        hideTitle: true,
      });
      openModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile],
  );

  useEffect(() => {
    const courseId = CourseService.getValue();
    const email = CourseEmailService.getValue();
    const name = CourseNameService.getValue();

    if (courseId && email === profile.email) {
      joinCourse(courseId, name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    setParams({ page: 1, perPage: 10, sort: 'rating:desc' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    navigate(isAuthenticated ? PATHS.courses : PATHS.signIn);
  };

  if (isFetching)
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3} mt={NAVBAR_HEIGHT}>
        <Loading variant="primary" />
      </Stack>
    );

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
