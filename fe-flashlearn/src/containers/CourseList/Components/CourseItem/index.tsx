import { COLOR_CODE } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { DialogContext, DialogType, Image } from '@components';
import { Button, Card, Stack, Tooltip, Typography } from '@mui/material';
import { CourseResponse, useGetMyLearningCourse, useGetStudents } from '@queries';
import { useJoinCourse } from '@queries/Student/useJoinCourse';
import { IRootState } from '@redux/store';
import { Toastify } from '@services';
import { useContext } from 'react';
import { FaRocket, FaStar, FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseItem = ({ course }: Props) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { courses, handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const isStudent = courses?.some((myCourse) => myCourse.id === course?.id);

  const { handleInvalidateStudentList } = useGetStudents();

  const { onJoinCourse } = useJoinCourse({
    onSuccess() {
      Toastify.success('Đăng ký khoá học thành công');
      handleInvalidateMyLearningCourseList();
      handleInvalidateStudentList();
      navigate(`${PATHS.courses}/${course.id}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const navigate = useNavigate();

  const handleRequestLogin = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn phải đăng nhập để tiếp tục',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Đăng nhập',
      cancelText: 'Hủy',
      onOk: () => {
        navigate(PATHS.signIn);
        closeModal();
      },
    });
    openModal();
  };

  const handleLearn = () => {
    if (isStudent) {
      return navigate(`${PATHS.courses}/${course.id}`);
    }
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: `Đăng Ký học khóa học ${course.name}?`,
      hideTitle: true,
      showIcon: true,
      icon: <Image src={IMAGES.raiseHand} sx={{ width: 100, height: 100 }} />,
      okText: 'Đăng Ký',
      cancelText: 'Hủy',
      onOk: () => {
        onJoinCourse({ id: course.id });
        closeModal();
      },
    });
    openModal();
  };

  return (
    <Card
      sx={{ width: '300px', height: '380px', position: 'relative', borderRadius: 2 }}
      onClick={() => navigate(`${PATHS.courses}/${course.id}`)}
    >
      <Stack justifyContent="space-between" alignItems="center" gap={4} flexShrink={1}>
        <Image
          sx={{ height: '300px', width: '300px', objectFit: 'cover', display: 'block' }}
          src={course?.image ?? IMAGES.noImage}
        />
        <Stack
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Stack
            sx={{
              background: 'white',
              borderRadius: '16px 16px 0 0',
              p: 2,
              px: 3,
            }}
          >
            <Typography fontSize={20} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
              {course.name}
            </Typography>
            <Typography
              sx={{
                overflow: 'hidden',
                whiteSpace: 'break-spaces',
                textOverflow: 'ellipsis',
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {course.description}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent={'space-between'} mb={2}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FaStar color={COLOR_CODE.PRIMARY} size={20} />
                <Typography>{course.avgRating === 0 ? 'N/A' : `${course.avgRating}/5`}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FaRocket color={COLOR_CODE.PRIMARY} size={20} />
                <Typography>{course.totalVocal} từ</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FaUser color={COLOR_CODE.PRIMARY} size={20} />
                <Typography>{course.totalStudent} người</Typography>
              </Stack>
            </Stack>
            <Tooltip
              title={isStudent ? 'Bạn đã đăng ký khóa học này rồi' : 'Đăng ký để tham gia ngay nhé'}
              arrow
              placement="top"
            >
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  !isAuthenticated ? handleRequestLogin() : handleLearn();
                }}
                sx={{
                  fontWeight: 800,
                  boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                  '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
                }}
              >
                {isStudent ? 'Xem chi tiết' : 'Đăng ký học'}
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

type Props = {
  course: CourseResponse;
};

export default CourseItem;
