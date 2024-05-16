import { COLOR_CODE } from '@appConfig';
import { PATHS } from '@appConfig/paths';
import { Link } from '@components';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoContainer = () => {
  const navigate = useNavigate();
  return (
    <Stack alignItems={'center'} justifyContent={'center'} gap={2}>
      <Link onClick={() => navigate(PATHS.root)} className="is-flex">
        <Stack gap={3} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          {/* <Image src={IMAGES.logo} alt="" sx={{ height: 90, width: 90 }} /> */}
          <Typography fontSize={60} fontWeight={900}>
            Flash Learn
          </Typography>
          {/* <Image
            src={IMAGES.fullLogo}
            sx={{ height: '50px', paddingBottom: 0.5, paddingLeft: 1 }}
          /> */}
        </Stack>
      </Link>
      <Typography textAlign={'center'} variant="h2" color={COLOR_CODE.GREY_700}>
        Chào mừng bạn đến với Flash Leasn
      </Typography>
      <Typography textAlign={'center'} color={COLOR_CODE.GREY_700}>
        Website giúp bạn chinh phục tiếng Anh một cách dễ dàng và thú vị!
      </Typography>
    </Stack>
  );
};

export default LogoContainer;
