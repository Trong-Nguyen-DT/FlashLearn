/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES, NAVBAR_HEIGHT } from '@appConfig';
import { Image, Loading } from '@components';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useGetMyLearningCourse } from '@queries';
import LearningItem from './LearningItem';

const LearningList = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  const { courses, isFetching } = useGetMyLearningCourse();

  console.log('🚀 ~ LearningList ~ courses:', courses);

  if (isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        overflowX: isMobileScreen && 'hidden',
        pt: `${NAVBAR_HEIGHT}px`,
        alignItems: 'center',
        gap: 3,
      }}
    >
      {courses?.length > 0 ? (
        <>
          {courses.map((course) => (
            <LearningItem course={course} />
          ))}
        </>
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Image
            src={IMAGES.noResultsFound}
            style={{ width: '200px', height: '200px', alignSelf: 'center' }}
          />
          <Typography variant="body1" fontWeight={600}>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2">Bạn chưa đăng ký học khóa học nào...</Typography>
        </Stack>
      )}{' '}
    </Stack>
  );
};

export default LearningList;
