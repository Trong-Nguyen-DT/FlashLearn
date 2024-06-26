/* eslint-disable react-refresh/only-export-components */
import { NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { Loading } from '@components';
import { Stack } from '@mui/material';
import { useAddStudents, useGetMyLearningCourse, useGetProfile, useGetStudents } from '@queries';
import { setAuthenticated, setProfile } from '@redux/auth/authSlice';
import { IRootState } from '@redux/store';
import { AuthService, CourseEmailService, CourseService, Toastify } from '@services';
import { useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

type ContainerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const JoinCourse: React.FC<ContainerProps> = ({ isAuthenticated }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const { profile } = useGetProfile();

  const { handleInvalidateStudentList } = useGetStudents();

  const { onAddNewStudents } = useAddStudents({
    onSuccess() {
      navigate(PATHS.courseDetail.replace(':courseId', courseId));
      Toastify.success('Đăng ký khoá học thành công');
      handleInvalidateMyLearningCourseList();
      handleInvalidateStudentList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const hasExist = query.has('hasExist') ? query.get('hasExist') : null;

  const email = query.has('email') ? query.get('email') : null;

  const courseId = query.has('courseId') ? query.get('courseId') : null;

  const logout = () => {
    AuthService.clearToken();
    dispatch(setAuthenticated(false));
    dispatch(setProfile(null));
  };

  useEffect(() => {
    if (hasExist && email && courseId) {
      if (hasExist === 'true' && isAuthenticated && profile?.email === email) {
        return onAddNewStudents({ courseId, email });
      }
      if (isAuthenticated || profile?.email !== email) {
        CourseService.setValue(courseId);
        CourseEmailService.setValue(email);
        logout();
        if (hasExist === 'true') {
          navigate(PATHS.signIn);
        } else {
          navigate(PATHS.signUp);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, email, hasExist, isAuthenticated, profile]);

  return (
    <Stack width={'100%'} mt={NAVBAR_HEIGHT} justifyContent="center" alignItems={'center'}>
      <Loading size="normal" variant="primary" />
    </Stack>
  );
};

export default connect(mapStateToProps)(JoinCourse);
