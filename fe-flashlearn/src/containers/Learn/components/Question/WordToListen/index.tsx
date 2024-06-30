import { COLOR_CODE } from '@appConfig';
import { ThemedRadioGroup, ThemedRadioGroupOptionType } from '@components';
import { IconButton, Stack, Typography } from '@mui/material';
import { QuestionResponse } from '@queries';
import { Callback } from '@utils';
import { useCallback, useMemo } from 'react';
import RepeatIcon from '../../RepeatIcon';
import { HiSpeakerWave } from 'react-icons/hi2';
import { shuffle } from 'lodash';

type Props = {
  question: QuestionResponse;
  answer: string;
  setAnswer: Callback;
  repeat: number;
  isAnswer?: boolean;
  isCorrect?: boolean;
};

const WordToListen: React.FC<Props> = ({
  question,
  answer,
  setAnswer,
  repeat,
  isAnswer,
  isCorrect,
}) => {
  const handlePlay = useCallback((utterance: SpeechSynthesisUtterance) => {
    const synth = window.speechSynthesis;
    synth.speak(utterance);
  }, []);

  const utterance = useMemo(
    () => question.answers.map((value) => new SpeechSynthesisUtterance(value.title)),
    [question],
  );

  const options: ThemedRadioGroupOptionType[] = shuffle(
    question.answers.map((item, index) => ({
      label: (
        <Stack gap={1} justifyContent={'center'} alignItems={'center'}>
          <IconButton
            onClick={() => handlePlay(utterance[index])}
            style={{ width: 70, height: 70 }}
          >
            <HiSpeakerWave size={50} />
          </IconButton>
          {isAnswer && (
            <Typography fontSize={20} fontWeight={700}>
              {item.title}
            </Typography>
          )}
        </Stack>
      ),
      value: item.title,
    })),
  );
  
  return (
    <Stack width={'100%'} sx={{ alignItems: 'center' }} gap={1}>
      {repeat !== 0 && <RepeatIcon />}
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_800} width={'50%'}>
        Hãy chọn phát âm phù hợp với từ sau
      </Typography>
      <Stack sx={{ width: '40%', pt: 4, gap: 4 }}>
        <Typography fontSize={40} fontWeight={800} color={COLOR_CODE.GREY_600} textAlign="center">
          {question.question}
        </Typography>
        <ThemedRadioGroup
          columns={2}
          options={options}
          value={answer}
          onChange={(_name, value) => setAnswer(value)}
          variant="square"
          spacing={2}
          color={isAnswer ? (isCorrect ? 'success' : 'danger') : 'default'}
        />
      </Stack>
    </Stack>
  );
};

export default WordToListen;
