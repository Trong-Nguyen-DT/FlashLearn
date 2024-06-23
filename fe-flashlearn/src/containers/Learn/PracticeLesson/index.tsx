import { useGetQuestionPracticeLesson } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';

type Props = {
  lessonId: string;
  courseId: string;
};

const PracticeLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeLesson } =
    useGetQuestionPracticeLesson({ id: lessonId });

  if (isLoading) return <Loading variant="primary" />;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeLesson}
    />
  );
};

export default PracticeLesson;
