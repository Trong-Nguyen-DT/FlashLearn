import { COLOR_CODE } from '@appConfig';
import { Input } from '@components';
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
  isAnswer?: boolean;
  isCorrect?: boolean;
};

const Translate: React.FC<Props> = ({ question, answer, setAnswer, repeat, isAnswer }) => {
  const sentence = useMemo(() => question.question.split(':')[0], [question]);

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
        <Input
          title={'Nhập câu trả lời của bạn vào đây nhé'}
          value={answer}
          disabled={isAnswer}
          defaultValue=""
          onChange={(e) => {
            const { value } = e.target;
            setAnswer(value);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Translate;
