/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetProfile } from '@queries/Profile';
import { setAuthenticated, setProfile } from '@redux/auth/authSlice';
import { IRootState } from '@redux/store';
import { AuthService, Toastify } from '@services';
import { connect } from 'react-redux';

const AuthContainer: React.FC<Props> = ({ onSetAuth, onSetProfile, isAuthenticated }) => {
  useGetProfile({
    onSuccessCallback: (data) => {
      onSetAuth(true);
      onSetProfile(data);
    },
    onErrorCallback: () => {
      clearAuth();
      isAuthenticated !== null &&
        Toastify.error('Failed to get profile. Please try to login again!');
    },
  });

  const clearAuth = () => {
    onSetAuth(false);
    onSetProfile(null);
    AuthService.clearToken();
  };

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
  onSetProfile: setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
