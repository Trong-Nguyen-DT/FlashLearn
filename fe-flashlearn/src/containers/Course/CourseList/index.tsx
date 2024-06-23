/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, useMediaQuery } from '@mui/material';
import CourseGrid from './Components/CourseGrid';
import CourseHeader from './Components/CourseHeader';

const CourseList = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
        overflow: 'hidden',
      }}
    >
      <CourseHeader />
      <CourseGrid />
    </Stack>
  );
};

export default CourseList;
