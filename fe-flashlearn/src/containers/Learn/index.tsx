import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import LearnLesson from './LearnLesson';
import PracticeLesson from './PracticeLesson';
import PracticeCourse from './PracticeCourse';

const Learn = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams] = useSearchParams();

  const lessonId = searchParams.get('lessonId');

  const location = useLocation();

  const { pathname } = location;

  const tab = pathname.split('/')[3];

  const renderContent = () => {
    switch (tab) {
      case 'practice-lesson':
        return <PracticeLesson lessonId={lessonId} courseId={courseId} />;
      case 'practice-course':
        return <PracticeCourse courseId={courseId} />;
      default:
        return <LearnLesson lessonId={lessonId} courseId={courseId} />;
    }
  };

  return renderContent();
};

export default Learn;
