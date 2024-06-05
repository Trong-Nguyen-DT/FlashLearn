/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@mui/material';
import PracticeItem from './PracticeItem';
import { PATHS } from '@appConfig';

type Props = {
  courseId: string;
};

const Practice = ({ courseId }: Props) => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
      }}
    >
      <PracticeItem
        content="Practice 1"
        title="Luyện tập"
        path={PATHS.practiceCourse.replace(':courseId', courseId)}
      />
    </Stack>
  );
};

export default Practice;
