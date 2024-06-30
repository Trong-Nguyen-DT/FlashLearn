import { useGetQuestionPracticeLesson } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';
import { Stack } from '@mui/material';

type Props = {
  lessonId: string;
  courseId: string;
};

const PracticeLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeLesson } =
    useGetQuestionPracticeLesson({ id: lessonId });

  if (isLoading) return;
  <Stack width={'100%'} alignItems={'center'} pt={3}>
    <Loading variant="primary" />
  </Stack>;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeLesson}
    />
  );
};

export default PracticeLesson;
