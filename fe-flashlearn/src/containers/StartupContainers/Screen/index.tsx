import { Stack } from '@mui/material';
import { IRootState } from '@redux/rootReducer';
import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
const Navbar = React.lazy(() => import('../NavBar'));

const Screen: React.FC<Props> = ({ children }) => {
  return (
    <Stack justifyContent="space-between">
      <Navbar />
      {children}
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
