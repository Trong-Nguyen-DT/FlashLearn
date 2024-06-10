/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@mui/material';
import PracticeItem from './PracticeItem';
import { IMAGES, PATHS } from '@appConfig';

type Props = {
  courseId: string;
};

const Practice = ({ courseId }: Props) => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        gap: 2,
      }}
    >
      <PracticeItem
        content="Rèn luyện những từ bạn chưa vững giúp bạn củng cố kiến thức từ vựng một cách hiệu quả."
        title="Rèn luyện những từ bạn chưa vững."
        path={PATHS.practiceCourse.replace(':courseId', courseId)}
        image={IMAGES.learning}
      />
      <PracticeItem
        content="Cải thiện kỹ năng nghe tiếng Anh của bạn qua các bài tập ngắn gọn và hiệu quả."
        title="Rèn Luyện Kỹ Năng Nghe."
        path={PATHS.practiceListen.replace(':courseId', courseId)}
        image={IMAGES.listening}
      />
    </Stack>
  );
};

export default Practice;
