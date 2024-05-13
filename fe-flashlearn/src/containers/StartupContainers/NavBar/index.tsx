import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingContainer from '@components/LoadingContainer';
import { COLOR_CODE } from '@appConfig';
import { Image } from '@components';

const Navbar = () => {
  // const { profile, isLoading } = useGetProfile({});
  const isLoading = false;

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <AppBar
        variant="elevation"
        elevation={0}
        position="fixed"
        style={{ background: COLOR_CODE.WHITE }}
      >
        <Toolbar variant="regular">
          <Stack
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyItems="center" gap={1}>
              <Link to={PATHS.root} className="is-flex">
                <Image src={IMAGES.logo} sx={{ height: '34px' }} />
              </Link>
              <Typography fontSize={24} color={COLOR_CODE.GREY_900}>
                FLASH LEARN
              </Typography>
            </Stack>

            {/* <UserMenu profile={profile} /> */}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
