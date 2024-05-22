import { COLOR_CODE } from '@appConfig';
import { CustomDropdown, DialogContext, DialogType, DropdownItem } from '@components';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useGetProfile } from '@queries';
import { setAuthenticated, setProfile } from '@redux/auth/authSlice';
import { AuthService } from '@services';
import * as React from 'react';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { TfiAngleDown } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { getShortName } from './helpers';

const UserMenu = () => {
  const { profile } = useGetProfile({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal, closeModal, setDialogContent } = React.useContext(DialogContext);

  const handleLogOut = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Log out',
      data: (
        <Stack gap={2}>
          <Typography fontSize={16} fontWeight={500}>
            Are you sure you want to log out?
          </Typography>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            pt={2}
          >
            <Button onClick={closeModal} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button onClick={logout} variant="contained" color="primary">
              Log out
            </Button>
          </Stack>
        </Stack>
      ),
      maxWidth: 'xs',
    });

    openModal();
  };

  const logout = () => {
    AuthService.clearToken();
    dispatch(setAuthenticated(false));
    dispatch(setProfile(null));
    closeModal();
  };

  const handleChangePassword = () => {
    console.log('change password');
    // setDialogContent({
    //   type: DialogType.CONTENT_DIALOG,
    //   title: 'Request Change Password',
    //   data: <EmailVerify />,
    //   maxWidth: 'sm',
    // });

    // openModal();
  };

  const menuOptions: DropdownItem[] = React.useMemo(
    () => [
      {
        label: 'My Profile',
        onClick: () => {
          navigate(PATHS.profile);
        },
        icon: <AiOutlineUser size={18} />,
      },
      {
        label: 'Change Password',
        onClick: () => {
          handleChangePassword();
        },
        icon: <AiOutlineLock size={18} />,
      },
      {
        label: 'Log Out',
        onClick: handleLogOut,
        icon: <IoLogOutOutline size={18} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <CustomDropdown
      label={
        <Stack
          flexDirection="row"
          alignItems="center"
          spacing={1}
          gap={2}
          sx={{
            cursor: 'pointer',
            p: 1,
            '&:hover': {
              bgcolor: COLOR_CODE.GREY_100,
              borderRadius: 1,
            },
          }}
        >
          <Avatar
            sx={{ width: 40, height: 40, bgcolor: COLOR_CODE.PRIMARY, fontSize: 13 }}
            src={profile.avatar}
          >
            {getShortName(profile.name)}
          </Avatar>
          <Stack alignItems={'start'}>
            <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
              <Typography variant="h3" whiteSpace={'nowrap'}>
                {profile.name}
              </Typography>
              <TfiAngleDown color={COLOR_CODE.GREY_500} size={15} />
            </Stack>
          </Stack>
        </Stack>
      }
      items={menuOptions}
    />
  );
};

export default UserMenu;
