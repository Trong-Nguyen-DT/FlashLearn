import { useGetQuestionLean } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';

type Props = {
  lessonId: string;
  courseId: string;
};

const LearnLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question, isLoading, handleInvalidateQuestionLearn } = useGetQuestionLean({
    id: lessonId,
  });

  if (isLoading) return <Loading />;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionLearn}
    />
  );
};

export default LearnLesson;
