import { MINI_SIDE_BAR_WIDTH, NAVBAR_HEIGHT } from '@appConfig/constants';
import { Stack } from '@mui/material';
import { IRootState } from '@redux/rootReducer';
import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
const Navbar = React.lazy(() => import('../NavBar'));

const Screen: React.FC<Props> = ({ isAuthenticated, children }) => {
  return (
    <Stack
      sx={
        isAuthenticated
          ? {
              paddingTop: `${NAVBAR_HEIGHT}px`,
              paddingLeft: `${MINI_SIDE_BAR_WIDTH}px`,
            }
          : {}
      }
    >
      {isAuthenticated && (
        <>
          <Navbar />
        </>
      )}

      {children}
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
