import { COLOR_CODE, IMAGES, NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { Image } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(PATHS.signIn);
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        marginTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <Image src={IMAGES.bannerHome} width={'100.55%'} />
      <Typography
        sx={{
          position: 'absolute',
          top: '27%',
          left: '7%',
          fontSize: 32,
          fontWeight: 700,
          color: COLOR_CODE.GREY_600,
        }}
      >
        Học nhanh, nhớ lâu, từ vựng tiếng Anh <br /> dễ dàng với{' '}
        <Typography component="span" fontWeight={800} fontSize={32}>
          flashcard
        </Typography>
        !
      </Typography>
      <Button
        variant="contained"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          fontSize: 40,
          fontWeight: 700,
          height: 70,
          borderRadius: 20,
          boxShadow: `6px 6px 0px ${COLOR_CODE.PRIMARY_600}`,
          '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
        }}
        onClick={handleStart}
      >
        Bắt đầu nào
      </Button>
    </Stack>
  );
};

export default Welcome;
