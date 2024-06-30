import { Stack } from '@mui/material';
import {
  ProgressPayload,
  QuestionResponse,
  TypeQuestion,
  useGetLesson,
  useGetMyLearningCourse,
  useGetStudents,
  useUpdateLearnProgress,
} from '@queries';
import { Toastify } from '@services';
import { Callback } from '@utils';
import { useCallback, useState } from 'react';
import { StepContent, StepType } from '../../helpers';
import LearnFooter, { FooterType } from '../Footer';
import FillBlank from './FillBlank';
import FillBlankChoice from './FillBlankChoice';
import ListenToWord from './ListenToWord';
import MultipleChoice from './MultipleChoice';
import Translate from './Translate';
import WordToListen from './WordToListen';
import { SOUNDS } from '@appConfig';

type Props = {
  question: QuestionResponse;
  step: number;
  setStep: Callback;
  xp: ProgressPayload[];
  setXP: Callback;
  repeat: number;
  stepContent: StepContent[];
  setStepContent: Callback;
  courseId: string;
};

const Question: React.FC<Props> = ({
  question,
  step,
  setStep,
  setXP,
  xp,
  repeat = 0,
  stepContent,
  setStepContent,
  courseId,
}) => {
  const [answer, setAnswer] = useState<string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(null);
  const { handleInvalidateLessonList } = useGetLesson({ courseId });
  const { handleInvalidateStudentList } = useGetStudents({ courseId });
  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();
  const { onUpdateLearnProgress, isLoading } = useUpdateLearnProgress({
    onSuccess() {
      handleInvalidateLessonList();
      handleInvalidateStudentList();
      handleInvalidateMyLearningCourseList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  const handlePlayCorrectSound = useCallback(() => {
    const correctSound = new Audio(SOUNDS.correct);
    correctSound.play();
  }, []);

  const handlePlayWrongSound = useCallback(() => {
    const wrongSound = new Audio(SOUNDS.wrong);
    wrongSound.play();
  }, []);

  const correctAnswer = question.answers.find((item) => item.correct);

  const handleCheck = () => {
    if (answer.toLowerCase() === correctAnswer.title.toLowerCase()) {
      handlePlayCorrectSound();
      setIsCorrect(true);
      const exist = xp.find((item) => item.id === question.id);
      const score = 1 / (repeat + 1);
      setXP([
        ...xp.filter((item) => item.id !== question.id),
        { id: question.id, quality: exist ? exist.quality + score : score },
      ]);
    } else {
      handlePlayWrongSound();
      setIsCorrect(false);
      setStepContent([
        ...stepContent.filter((item) => item.type !== StepType.PREVIEW),
        { question: question, type: StepType.QUESTION, repeat: repeat + 1 },
        { type: StepType.PREVIEW },
      ]);
    }
  };

  const handleNext = () => {
    setAnswer(null);
    setIsCorrect(null);
    setStep(step + 1);
    if (step === stepContent.length - 2) {
      onUpdateLearnProgress({
        courseId: courseId,
        learningVocabularies: xp.map((item) => ({ ...item, quality: (item.quality * 5) / 7 })),
      });
    }
  };

  return (
    <Stack
      sx={{
        width: '100%',
        mt: 2,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      {question.typeQuestion === TypeQuestion.FILL_THE_BLANK_CHOICE && (
        <FillBlankChoice
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      {question.typeQuestion === TypeQuestion.MULTIPLE_CHOICE && (
        <MultipleChoice
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      {question.typeQuestion === TypeQuestion.WORD_TO_LISTENING && (
        <WordToListen
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      {question.typeQuestion === TypeQuestion.LISTENING_TO_WORD && (
        <ListenToWord
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      {question.typeQuestion === TypeQuestion.FILL_THE_BLANK && (
        <FillBlank
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      {question.typeQuestion === TypeQuestion.TRANSLATE && (
        <Translate
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          repeat={repeat}
          isCorrect={isCorrect}
          isAnswer={isCorrect !== null}
        />
      )}
      <LearnFooter
        isAnswered={isCorrect !== null}
        variant={isCorrect ? FooterType.CORRECT : isCorrect === false ? FooterType.INCORRECT : null}
        handleNext={handleNext}
        handleCheck={handleCheck}
        isDisableCheck={!answer}
        isLoading={isLoading}
        correctAnswer={correctAnswer.title}
      />
    </Stack>
  );
};

export default Question;
