import { useGetQuestionPracticeCourse } from '@queries';
import LearnContainer from '../components/LearnContainer';
import { Loading } from '@components';

type Props = {
  courseId: string;
};

const PracticeCourse: React.FC<Props> = ({ courseId }) => {
  const { question, isLoading, handleInvalidateQuestionPracticeCourse } =
    useGetQuestionPracticeCourse({ id: courseId });

  if (isLoading) return <Loading />;

  return (
    <LearnContainer
      learnContent={question}
      courseId={courseId}
      invalidCallback={handleInvalidateQuestionPracticeCourse}
    />
  );
};

export default PracticeCourse;
