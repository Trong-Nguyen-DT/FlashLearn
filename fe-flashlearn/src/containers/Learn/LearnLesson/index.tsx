import { useGetQuestionLean } from '@queries';
import LearnContainer from '../components/LearnContainer';

type Props = {
  lessonId: string;
  courseId: string;
};

const LearnLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question } = useGetQuestionLean({ id: lessonId });

  return <LearnContainer learnContent={question} courseId={courseId} />;
};

export default LearnLesson;
