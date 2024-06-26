import { useGetQuestionLean } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';
import { Stack } from '@mui/material';

type Props = {
  lessonId: string;
  courseId: string;
};

const LearnLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question, isLoading, handleInvalidateQuestionLearn } = useGetQuestionLean({
    id: lessonId,
  });

  if (isLoading) return;
  <Stack width={'100%'} alignItems={'center'} pt={3}>
    <Loading variant="primary" />
  </Stack>;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionLearn}
    />
  );
};

export default LearnLesson;
