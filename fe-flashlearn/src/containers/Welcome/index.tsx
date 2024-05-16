import { COLOR_CODE, IMAGES } from '@appConfig';
import { Image } from '@components';
import { Stack, Typography } from '@mui/material';

const Welcome = () => {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: '100%',
          height: '50vh',
          backgroundImage: `url(${IMAGES.banner})`,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 0 40px 40px',
          margin: -0.5,
        }}
      >
        <Stack>
          <Typography
            textAlign={'center'}
            fontSize={70}
            color={COLOR_CODE.GREY_700}
            fontWeight={600}
          >
            Chào mừng bạn
            <br />
            đến với{' '}
            <Typography component="span" color={COLOR_CODE.PRIMARY} fontSize={70} fontWeight={900}>
              Flash Learn
            </Typography>
          </Typography>
          {/* <Image src={IMAGES.slogan} sx={{ height: '300px' }} /> */}
        </Stack>
        <Image src={IMAGES.teaching} sx={{ height: '400px', ml: 14 }} />
      </Stack>
    </Stack>
  );
};

export default Welcome;
