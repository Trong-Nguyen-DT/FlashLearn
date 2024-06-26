import { Loading } from '@components';
import { useGetQuestionPracticeCourseListen } from '@queries/Learn/useGetQuestionPracticeCourseListen';
import LearnContainer from '../components/LearnContainer';
import { Stack } from '@mui/material';

type Props = {
  courseId: string;
};

const PracticeListen: React.FC<Props> = ({ courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeCourseListen } =
    useGetQuestionPracticeCourseListen({ id: courseId, refetchOnMount: true });

  if (isLoading) return;
  <Stack width={'100%'} alignItems={'center'} pt={3}>
    <Loading variant="primary" />
  </Stack>;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeCourseListen}
    />
  );
};

export default PracticeListen;
