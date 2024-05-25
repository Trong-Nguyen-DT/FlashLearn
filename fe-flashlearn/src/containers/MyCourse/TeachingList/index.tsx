/* eslint-disable @typescript-eslint/no-explicit-any */
import { NAVBAR_HEIGHT } from '@appConfig';
import { Stack, Typography, useMediaQuery } from '@mui/material';

const TeachingList = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
        pt: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <Typography>My Course Teaching</Typography>
    </Stack>
  );
};

export default TeachingList;
