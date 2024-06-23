/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from '@appConfig';
import { Image, Loading } from '@components';
import { Stack, Typography } from '@mui/material';
import { useGetLesson } from '@queries';
import { isOdd } from '@utils';
import { useParams } from 'react-router-dom';
import LessonItem from './LessonItem';
import StartScreen from './StartScreen';
import NewItem from './NewItem';

type Props = {
  isOwner: boolean;
  isStudent: boolean;
};

const LessonList: React.FC<Props> = ({ isOwner, isStudent }) => {
  const { courseId } = useParams<{ courseId: string }>();

  const { lessons, isFetching } = useGetLesson({ courseId });

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
        alignItems: 'center',
        pt: 6,
      }}
    >
      {lessons?.length > 0 ? (
        <>
          {lessons.map((lesson, index) => (
            <>
              <LessonItem
                lesson={lesson}
                courseId={courseId}
                index={index}
                isNext={(lessons[index - 1]?.learned ?? true) && !lesson?.learned}
                isOwner={isOwner}
                isStudent={isStudent}
              />
              {(index !== lessons.length - 1 || isOwner) && (
                <Image
                  src={IMAGES.connectLine}
                  width={500}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    ...(isOdd(index) ? { transform: 'scaleX(-1)' } : {}),
                  }}
                />
              )}
            </>
          ))}
          {isOwner && <NewItem courseId={courseId} index={lessons.length} />}
        </>
      ) : isOwner ? (
        <StartScreen courseId={courseId} />
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Typography variant="body1" fontWeight={600}>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2">
            Khóa học này chưa có bài học nào, bạn quay lại sau nhé...
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default LessonList;
