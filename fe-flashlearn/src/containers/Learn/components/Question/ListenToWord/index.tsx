import { COLOR_CODE } from '@appConfig';
import { ThemedRadioGroup } from '@components';
import { IconButton, Stack, Typography } from '@mui/material';
import { QuestionResponse } from '@queries';
import { Callback } from '@utils';
import { useMemo } from 'react';
import { HiSpeakerWave } from 'react-icons/hi2';
import RepeatIcon from '../../RepeatIcon';

type Props = {
  question: QuestionResponse;
  answer: string;
  setAnswer: Callback;
  repeat: number;
};

const ListenToWord: React.FC<Props> = ({ question, answer, setAnswer, repeat }) => {
  const options = useMemo(
    () =>
      question.answers.map((item) => ({
        label: item.title,
        value: item.title,
      })),
    [question],
  );

  const utterance = useMemo(
    () => new SpeechSynthesisUtterance(question.question),
    [question.question],
  );

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    synth.speak(utterance);
  };

  return (
    <Stack width={'100%'} sx={{ alignItems: 'center' }} gap={1}>
      {repeat !== 0 && <RepeatIcon />}
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_800} width={'50%'}>
        Hãy chọn đáp án phù hợp với phát âm sau
      </Typography>
      <Stack sx={{ width: '40%', pt: 4, gap: 4 }}>
        <Stack justifyContent="center" alignItems="center">
          <IconButton onClick={() => handlePlay()} style={{ width: 100, height: 100 }}>
            <HiSpeakerWave size={80} />
          </IconButton>
        </Stack>
        <ThemedRadioGroup
          columns={2}
          options={options}
          value={answer}
          onChange={(_name, value) => setAnswer(value)}
        />
      </Stack>
    </Stack>
  );
};

export default ListenToWord;
