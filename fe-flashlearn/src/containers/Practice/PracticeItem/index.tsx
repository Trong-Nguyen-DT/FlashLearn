import { COLOR_CODE } from '@appConfig';
import { Image } from '@components';
import { Card, Stack, Typography } from '@mui/material';
import { Toastify } from '@services';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  content: string;
  path?: string;
  image?: string;
  disabled?: boolean;
};

const PracticeItem = ({ content, title, path, image, disabled }: Props) => {
  const navigate = useNavigate();

  const handlePractice = () => {
    if (disabled) {
      return Toastify.error('Bạn phải bắt đầu học trước.');
    }
    navigate(path);
  };
  return (
    <Card sx={{ borderRadius: 4, width: '80%', overflow: 'unset' }} onClick={handlePractice}>
      <Stack justifyContent={'space-between'} direction="row" alignItems="center" p={2} px={6}>
        <Stack alignItems="center" gap={4} direction="row" width={'65%'}>
          <Stack width={'100%'}>
            <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
              {title}
            </Typography>
            <Typography fontSize={20} fontWeight={600} color={COLOR_CODE.GREY_500}>
              {content}
            </Typography>
          </Stack>
        </Stack>
        <Stack height={220} justifyContent="center" alignItems="center">
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: COLOR_CODE.PRIMARY_300,
              boxShadow: `0px 0px 0px 20px ${COLOR_CODE.PRIMARY_100}`,
            }}
          >
            <Image
              sx={{ height: '250px', width: '250px', objectFit: 'cover', borderRadius: 2 }}
              src={image}
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PracticeItem;
