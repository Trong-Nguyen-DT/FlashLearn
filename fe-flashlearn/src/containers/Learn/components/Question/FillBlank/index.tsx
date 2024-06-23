import { COLOR_CODE } from '@appConfig';
import { Input } from '@components';
import { Box, Stack, Typography } from '@mui/material';
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

const FillBlank: React.FC<Props> = ({ question, answer, setAnswer, repeat, isAnswer }) => {
  const sentence = useMemo(() => question.question.split(':')[0], [question]);
  const mean = useMemo(() => question.question.split(':')[1], [question]);

  return (
    <Stack width={'100%'} sx={{ alignItems: 'center' }} gap={1}>
      {repeat !== 0 && <RepeatIcon />}
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_800} width={'50%'}>
        Điền vào chỗ còn thiếu
      </Typography>
      <Stack sx={{ width: '40%', pt: 4, gap: 4 }}>
        <Typography fontSize={24} fontWeight={600} color={COLOR_CODE.GREY_600}>
          {mean}
        </Typography>
        <Typography fontSize={20}>
          {sentence.split('____')[0]}
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              borderBottom: '1px solid black',
            }}
          >
            <Input
              disabled={isAnswer}
              variant="standard"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              defaultValue=""
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'inherit' },
              }}
              sx={{ width: '100px' }}
            />
          </Box>{' '}
          {sentence.split('____')[1]}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FillBlank;
