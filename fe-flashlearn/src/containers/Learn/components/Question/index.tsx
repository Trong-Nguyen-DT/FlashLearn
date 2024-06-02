import { Stack } from '@mui/material';
import { ProgressPayload, QuestionResponse, TypeQuestion } from '@queries';
import LearnFooter, { FooterType } from '../Footer';
import { Callback } from '@utils';
import FillBlank from './FillBlank';
import { useState } from 'react';
import MultipleChoice from './MultipleChoice';
import WordToListen from './WordToListen';
import ListenToWord from './ListenToWord';
import { StepContent, StepType } from '../../helpers';

type Props = {
  question: QuestionResponse;
  step: number;
  setStep: Callback;
  xp: ProgressPayload[];
  setXP: Callback;
  repeat: number;
  stepContent: StepContent[];
  setStepContent: Callback;
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
}) => {
  const [answer, setAnswer] = useState<string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(null);

  const handleCheck = () => {
    const correctAnswer = question.answers.find((item) => item.correct);
    if (answer === correctAnswer.title) {
      setIsCorrect(true);
      const exist = xp.find((item) => item.id === question.id);
      const score = 1 / (repeat + 1);
      setXP([
        ...xp.filter((item) => item.id !== question.id),
        { id: question.id, quality: exist ? exist.quality + score : score },
      ]);
    } else {
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
      {question.typeQuestion === TypeQuestion.FILL_THE_BLANK && (
        <FillBlank question={question} answer={answer} setAnswer={setAnswer} repeat={repeat} />
      )}
      {question.typeQuestion === TypeQuestion.MULTIPLE_CHOICE && (
        <MultipleChoice question={question} answer={answer} setAnswer={setAnswer} repeat={repeat} />
      )}
      {question.typeQuestion === TypeQuestion.WORD_TO_LISTENING && (
        <WordToListen question={question} answer={answer} setAnswer={setAnswer} repeat={repeat} />
      )}
      {question.typeQuestion === TypeQuestion.LISTENING_TO_WORD && (
        <ListenToWord question={question} answer={answer} setAnswer={setAnswer} repeat={repeat} />
      )}
      <LearnFooter
        isAnswered={isCorrect !== null}
        variant={isCorrect ? FooterType.CORRECT : isCorrect === false ? FooterType.INCORRECT : null}
        step={step}
        setStep={handleNext}
        handleCheck={handleCheck}
      />
    </Stack>
  );
};

export default Question;
