/* eslint-disable @typescript-eslint/no-explicit-any */
import { NAVBAR_HEIGHT, PATHS } from '@appConfig';
import { Tabs } from '@components';
import { Stack, useMediaQuery } from '@mui/material';
import MyCourseHeader from './MyCourseHeader';
import { useLocation } from 'react-router-dom';
import TeachingList from './TeachingList';
import LearningList from './LearningList';

const tabItems = [
  { label: 'Đang học', path: PATHS.myCourseLearning },
  { label: 'Đang dạy', path: PATHS.myCourseTeaching },
];

const MyCourse = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  const location = useLocation();

  const { pathname } = location;

  const tab = pathname.split('/')[2];

  const renderBody = () => {
    switch (tab) {
      case 'teaching':
        return <TeachingList />;
      default:
        return <LearningList />;
    }
  };

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
        pt: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <MyCourseHeader />
      <Stack mx={24}>
        <Tabs items={tabItems} />
        <Stack sx={{ width: '100%', height: '63vh', overflow: 'auto' }}>{renderBody()}</Stack>
      </Stack>
    </Stack>
  );
};

export default MyCourse;
