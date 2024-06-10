import { COLOR_CODE, PATHS } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { CustomDropdown, DialogContext, DialogType, DropdownItem, Image } from '@components';
import { Card, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { CourseResponse, useGetMyLearningCourse, useLeaveCourse } from '@queries';
import toastify from '@services/toastify';
import { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

type Props = {
  course: CourseResponse;
};

const LearningItem = ({ course }: Props) => {
  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const { onLeaveCourse } = useLeaveCourse({
    onSuccess() {
      handleInvalidateMyLearningCourseList();
      toastify.success('Rời khỏi khóa học thành công');
      closeModal();
    },
  });

  const menuOptions: DropdownItem[] = [
    {
      label: 'Đánh giá khóa học',
      onClick: (e) => {
        e.stopPropagation();
        document.getElementById('close-popover-button')?.click();
        handleRateCourse();
      },
      icon: <FaStar size={18} />,
    },
    {
      label: 'Rời khỏi khóa học',
      onClick: (e) => {
        e.stopPropagation();
        document.getElementById('close-popover-button')?.click();
        handleLeaveCourse();
      },
      icon: <FaSignOutAlt size={18} />,
    },
  ];

  const handleRateCourse = () => {
    // TODO: Rate course
  };

  const handleLeaveCourse = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn có chắc muốn rời khỏi khóa học này?',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        onLeaveCourse({ id: course.id });
        closeModal();
      },
    });
    openModal();
  };

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(PATHS.courseDetail.replace(':courseId', course.id.toString()));
  };

  return (
    <Card
      sx={{ borderRadius: 4, width: '80%', overflow: 'unset' }}
      onClick={(e) => {
        e.preventDefault();
        handleViewDetail();
      }}
    >
      <Stack justifyContent={'space-between'} direction="row" alignItems="center" p={2} px={6}>
        <Stack alignItems="center" gap={4} direction="row" width={'100%'}>
          <Image
            sx={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: 2 }}
            src={course?.image ?? IMAGES.noImage}
          />
          <Stack width={'100%'}>
            <Stack direction="row" justifyContent={'space-between'} width={'100%'}>
              <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
                {course.name}
              </Typography>
              <CustomDropdown
                label={
                  <IconButton>
                    <IoMdMore size={40} />
                  </IconButton>
                }
                items={menuOptions}
              />
            </Stack>
            <Typography
              sx={{
                overflow: 'hidden',
                whiteSpace: 'break-spaces',
                textOverflow: 'ellipsis',
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                pr: 4,
              }}
            >
              {course.description}
            </Typography>
            <Typography fontSize={20}>
              <b>
                {course.totalVocabLearned}/{course.totalVocal}
              </b>{' '}
              từ đã học
            </Typography>
            <Stack direction="row" gap={4} alignItems={'center'}>
              <LinearProgress
                variant="determinate"
                value={(course.totalVocabLearned / course.totalVocal) * 100}
                sx={{
                  width: '80%',
                  background: COLOR_CODE.GREY_200,
                  height: '10px',
                  borderRadius: 5,
                  '.MuiLinearProgress-bar': {
                    height: '10px',
                    borderRadius: 5,
                  },
                }}
              />
              <Typography fontSize={20} mr={4}>
                {(course.totalVocabLearned / course.totalVocal) * 100}%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default LearningItem;
