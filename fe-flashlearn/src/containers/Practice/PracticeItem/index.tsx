import { COLOR_CODE } from '@appConfig';
import { Image } from '@components';
import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  content: string;
  path?: string;
  image?: string;
};

const PracticeItem = ({ content, title, path, image }: Props) => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate(path);
  };
  return (
    <Card sx={{ borderRadius: 4, width: '80%', overflow: 'unset' }} onClick={handlePractice}>
      <Stack justifyContent={'space-between'} direction="row" alignItems="center" p={2} px={6}>
        <Stack alignItems="center" gap={4} direction="row" width={'100%'}>
          <Stack width={'100%'}>
            <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
              {title}
            </Typography>
            <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
              {content}
            </Typography>
          </Stack>
          <Image
            sx={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: 2 }}
            src={image}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default PracticeItem;
