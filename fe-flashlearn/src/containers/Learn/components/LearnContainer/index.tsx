import { NAVBAR_HEIGHT } from '@appConfig';
import { Stack, useMediaQuery } from '@mui/material';
import { LearnQuestionResponse, ProgressPayload } from '@queries';
import LearnHeader from '../Header';
import { useEffect, useMemo, useState } from 'react';
import { StepContent, StepType, getInitStepContent } from '../../helpers';
import NewWord from '../NewWord';
import Question from '../Question';
import Preview from '../Preview';
import { Callback } from '@utils';

type Props = {
  learnContent: LearnQuestionResponse;
  courseId: string;
  invalidCallback: Callback;
};

const LearnContainer: React.FC<Props> = ({ learnContent, courseId, invalidCallback }) => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');
  const [step, setStep] = useState<number>(0);
  const [stepContent, setStepContent] = useState<StepContent[]>([]);
  const [xp, setXP] = useState<ProgressPayload[]>([]);

  const currentStep = useMemo(() => stepContent[step], [step, stepContent]);

  useEffect(() => {
    if (learnContent) setStepContent(getInitStepContent(learnContent));
  }, [learnContent]);

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
        pt: `${NAVBAR_HEIGHT}px`,
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <LearnHeader courseId={courseId} stepContent={stepContent} step={step} />
      {currentStep?.type === StepType.NEW_WORD && (
        <NewWord vocabulary={currentStep.newWord} step={step} setStep={setStep} />
      )}
      {currentStep?.type === StepType.QUESTION && (
        <Question
          question={currentStep.question}
          step={step}
          setStep={setStep}
          xp={xp}
          setXP={setXP}
          repeat={currentStep.repeat}
          stepContent={stepContent}
          setStepContent={setStepContent}
          courseId={courseId}
        />
      )}
      {currentStep?.type === StepType.PREVIEW && (
        <Preview
          xp={xp}
          step={step}
          setStep={setStep}
          courseId={courseId}
          learnContent={learnContent}
          invalidCallback={invalidCallback}
        />
      )}
    </Stack>
  );
};

export default LearnContainer;
