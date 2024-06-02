import { useGetQuestionPracticeLesson } from '@queries';
import LearnContainer from '../components/LearnContainer';

type Props = {
  lessonId: string;
  courseId: string;
};

const PracticeLesson: React.FC<Props> = ({ lessonId, courseId }) => {
  const { question } = useGetQuestionPracticeLesson({ id: lessonId });

  return <LearnContainer learnContent={question} courseId={courseId} />;
};

export default PracticeLesson;
