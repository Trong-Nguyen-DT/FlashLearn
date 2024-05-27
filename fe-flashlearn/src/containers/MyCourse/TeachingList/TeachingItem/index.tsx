import { COLOR_CODE, PATHS } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { CustomDropdown, DialogContext, DialogType, DropdownItem, Image } from '@components';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import { CourseResponse, useDeleteCourse, useGetMyTeachingCourse } from '@queries';
import toastify from '@services/toastify';
import { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaRocket, FaStar, FaUser } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const TeachingItem = ({ course }: Props) => {
  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { handleInvalidateMyTeachingCourseList } = useGetMyTeachingCourse();

  const { onDeleteCourse } = useDeleteCourse({
    onSuccess() {
      handleInvalidateMyTeachingCourseList();
      toastify.success('Xóa khóa học thành công');
    },
  });

  const menuOptions: DropdownItem[] = [
    {
      label: 'Xóa khóa học',
      onClick: (e) => {
        e.stopPropagation();
        document.getElementById('close-popover-button')?.click();
        handleDeleteCourse();
      },
      icon: <FaSignOutAlt size={18} />,
    },
  ];

  const handleDeleteCourse = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText:
        'Bạn sẽ mất toàn bộ dữ liệu liên quan đến khóa học này và hành động này không thể hoàn tác.',
      title: 'Bạn có chắc muốn xóa khóa học này?',
      showIcon: true,
      isWarning: true,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        onDeleteCourse({ id: course.id.toString() });
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
            <Stack direction="row" alignItems="center" mb={2} gap={4}>
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
                <Typography>{course.totalStudent} học viên</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

type Props = {
  course: CourseResponse;
};

export default TeachingItem;
