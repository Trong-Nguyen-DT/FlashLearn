import { COLOR_CODE } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { Image, Link } from '@components';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoContainer = () => {
  const navigate = useNavigate();
  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <Link onClick={() => navigate(PATHS.root)} className="is-flex">
        <Stack gap={3} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <Image src={IMAGES.bigLogo} alt="" sx={{ height: 90, width: 90 }} />
          <Typography fontSize={40} variant="h1" color={COLOR_CODE.GREY_900}>
            FLASH LEARN
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default LogoContainer;
