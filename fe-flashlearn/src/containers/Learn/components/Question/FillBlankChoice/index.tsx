import { COLOR_CODE } from '@appConfig';
import { ThemedRadioGroup } from '@components';
import { Stack, Typography } from '@mui/material';
import { QuestionResponse } from '@queries';
import { Callback } from '@utils';
import { useMemo } from 'react';
import RepeatIcon from '../../RepeatIcon';
import { shuffle } from 'lodash';

type Props = {
  question: QuestionResponse;
  answer: string;
  setAnswer: Callback;
  repeat: number;
  isAnswer?: boolean;
  isCorrect?: boolean;
};

const FillBlankChoice: React.FC<Props> = ({
  question,
  answer,
  setAnswer,
  repeat,
  isAnswer,
  isCorrect,
}) => {
  const sentence = useMemo(() => question.question.split(':')[0], [question]);

  const options = shuffle(
    question.answers.map((item) => ({
      label: item.title,
      value: item.title,
    })),
  );

  return (
    <Stack width={'100%'} sx={{ alignItems: 'center' }} gap={1}>
      {repeat !== 0 && <RepeatIcon />}
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_800} width={'50%'}>
        Điền vào chỗ còn thiếu
      </Typography>
      <Stack sx={{ width: '40%', pt: 4, gap: 4 }}>
        <Typography fontSize={24} fontWeight={600} color={COLOR_CODE.GREY_600}>
          {sentence}
        </Typography>
        <ThemedRadioGroup
          options={options}
          value={answer}
          onChange={(_name, value) => setAnswer(value)}
          color={isAnswer ? (isCorrect ? 'success' : 'danger') : 'default'}
        />
      </Stack>
    </Stack>
  );
};

export default FillBlankChoice;
