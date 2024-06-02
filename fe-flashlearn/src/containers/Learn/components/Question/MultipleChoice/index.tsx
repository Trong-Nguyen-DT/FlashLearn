import { COLOR_CODE } from '@appConfig';
import { ThemedRadioGroup } from '@components';
import { Stack, Typography } from '@mui/material';
import { QuestionResponse } from '@queries';
import { Callback } from '@utils';
import { useMemo } from 'react';
import RepeatIcon from '../../RepeatIcon';

type Props = {
  question: QuestionResponse;
  answer: string;
  setAnswer: Callback;
  repeat: number;
};

const MultipleChoice: React.FC<Props> = ({ question, answer, setAnswer, repeat }) => {
  const options = useMemo(
    () =>
      question.answers.map((item) => ({
        label: item.title,
        value: item.title,
      })),
    [question],
  );

  return (
    <Stack width={'100%'} sx={{ alignItems: 'center' }} gap={1}>
      {repeat !== 0 && <RepeatIcon />}
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_800} width={'50%'}>
        Chọn câu trả lời phù hợp
      </Typography>
      <Stack sx={{ width: '40%', pt: 8, gap: 8 }}>
        <Typography fontSize={40} fontWeight={800} color={COLOR_CODE.GREY_600} textAlign="center">
          {question.question}
        </Typography>
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

export default MultipleChoice;
