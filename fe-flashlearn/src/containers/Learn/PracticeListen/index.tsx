import { Loading } from '@components';
import { useGetQuestionPracticeCourseListen } from '@queries/Learn/useGetQuestionPracticeCourseListen';
import LearnContainer from '../components/LearnContainer';

type Props = {
  courseId: string;
};

const PracticeListen: React.FC<Props> = ({ courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeCourseListen } =
    useGetQuestionPracticeCourseListen({ id: courseId, refetchOnMount: true });

  if (isLoading) return <Loading />;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeCourseListen}
    />
  );
};

export default PracticeListen;
