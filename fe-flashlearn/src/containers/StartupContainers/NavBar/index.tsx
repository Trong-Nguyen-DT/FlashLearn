import { IMAGES } from '@appConfig';
import { PATHS } from '@appConfig/paths';
import { Image, Link, Tabs } from '@components';
import { AppBar, Button, Stack, Toolbar } from '@mui/material';
import { IRootState } from '@redux/store';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const tabItems = [
  { label: 'Trang Chủ', path: PATHS.welcome },
  { label: 'Các khóa học', path: PATHS.courses },
];

const Navbar: React.FC<Props> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const displayTabs = isAuthenticated
    ? tabItems.concat({ label: 'Khóa học của tôi', path: PATHS.myCourse })
    : tabItems;

  return (
    <>
      <AppBar
        variant="elevation"
        elevation={0}
        position="fixed"
        style={{ background: 'transparent', border: 0 }}
      >
        <Toolbar variant="regular">
          <Stack
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyContent="center" gap={1} alignItems="center">
              <Link
                onClick={() => navigate(PATHS.root)}
                className="is-flex"
                style={{ alignItems: 'end', cursor: 'pointer' }}
              >
                <Image src={IMAGES.logo} sx={{ height: '40px' }} />
                <Image
                  src={IMAGES.fullLogo}
                  sx={{ height: '30px', paddingLeft: 2, paddingBottom: '2px' }}
                />
              </Link>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Tabs items={displayTabs} />
            </Stack>
            {isAuthenticated && <UserMenu />}
            {!isAuthenticated && (
              <Stack direction="row" gap={2} my={2}>
                <Button variant="outlined" onClick={() => navigate(PATHS.signIn)}>
                  Đăng nhập
                </Button>
                <Button variant="contained" onClick={() => navigate(PATHS.signUp)}>
                  Đăng Ký
                </Button>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

type Props = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
