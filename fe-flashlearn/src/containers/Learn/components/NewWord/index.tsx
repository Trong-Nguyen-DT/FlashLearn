import { COLOR_CODE, IMAGES } from '@appConfig';
import { Image } from '@components';
import { Divider, Stack, Typography } from '@mui/material';
import { NewWordResponse } from '@queries';
import { Callback, getStartCase } from '@utils';
import LearnFooter from '../Footer';

type Props = {
  vocabulary: NewWordResponse;
  step: number;
  setStep: Callback;
};

const NewWord: React.FC<Props> = ({ vocabulary, step, setStep }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        mt: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
      }}
    >
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_600} width={'50%'}>
        Từ vựng mới
      </Typography>
      <Stack sx={{ width: '60%', flexGrow: 1, alignItems: 'center' }}>
        <Image
          src={vocabulary.image ?? IMAGES.noImage}
          sx={{ height: 300, objectFit: 'contain', mb: 2 }}
        />
        <Typography
          fontSize={80}
          fontWeight={1000}
          color={COLOR_CODE.PRIMARY}
          letterSpacing={4}
          lineHeight="90px"
        >
          {vocabulary.word}
        </Typography>
        <Typography fontSize={20} fontWeight={800} color={COLOR_CODE.GREY_400}>
          ({getStartCase(vocabulary.partOfSpeech.replace('_', ' '))})
        </Typography>
        <Divider sx={{ my: 2, width: '30%' }} />
        <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.GREY_600}>
          {vocabulary.meaning}
        </Typography>
      </Stack>
      <LearnFooter isAnswered={true} step={step} setStep={setStep}  />
    </Stack>
  );
};

export default NewWord;
