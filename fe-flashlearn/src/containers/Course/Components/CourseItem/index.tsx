import { COLOR_CODE } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { DialogContext, DialogType, Image } from '@components';
import { Button, Card, Stack, Typography } from '@mui/material';
import { CourseResponse } from '@queries';
import { IRootState } from '@redux/store';
import { useContext } from 'react';
import { FaRocket, FaStar, FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseItem = ({ course }: Props) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

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

  const handleLearn = () => {};

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
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                !isAuthenticated ? handleRequestLogin() : handleLearn();
              }}
            >
              Bắt đầu học
            </Button>
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
