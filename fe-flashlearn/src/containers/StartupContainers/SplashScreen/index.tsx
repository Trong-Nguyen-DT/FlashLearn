import { Stack } from '@mui/material';
import './style.scss';
import { IMAGES } from '@appConfig';

const SplashScreen = () => (
  <Stack className="cmp-splash-screen">
    <img src={IMAGES.logo} alt="" className="cmp-splash-screen__image" />
  </Stack>
);

export default SplashScreen;
