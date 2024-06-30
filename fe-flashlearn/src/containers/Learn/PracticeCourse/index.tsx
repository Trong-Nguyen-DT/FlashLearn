import { useGetQuestionPracticeCourse } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';
import { Stack } from '@mui/material';

type Props = {
  courseId: string;
};

const PracticeCourse: React.FC<Props> = ({ courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeCourse } =
    useGetQuestionPracticeCourse({ id: courseId, refetchOnMount: true });

  if (isLoading) return
  <Stack width={'100%'} alignItems={'center'} pt={3}>
    <Loading variant="primary" />
  </Stack>;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeCourse}
    />
  );
};

export default PracticeCourse;
