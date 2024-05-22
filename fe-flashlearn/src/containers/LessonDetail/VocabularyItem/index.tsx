import { COLOR_CODE } from '@appConfig';
import { IMAGES } from '@appConfig/images';
import { Image } from '@components';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import { VocabularyOfLessonResponse } from '@queries';
import { HiSpeakerWave } from 'react-icons/hi2';

const VocabularyItem = ({ vocabulary }: Props) => {
  return (
    <Card sx={{ borderRadius: 4, width: '100%' }}>
      <Stack justifyContent={'space-between'} direction="row" alignItems="center" p={2} px={6}>
        <Stack alignItems="center" gap={4} direction="row">
          <Image
            sx={{ height: '200px', width: '200px', objectFit: 'cover' }}
            src={vocabulary?.image ?? IMAGES.noImage}
          />
          <Stack>
            <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
              {vocabulary.vocabulary.word}
            </Typography>
            <Typography fontSize={20}>({vocabulary.vocabulary.partOfSpeech})</Typography>
            <Typography
              fontSize={20}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'break-spaces',
                textOverflow: 'ellipsis',
                mb: 1,
              }}
            >
              {vocabulary.meaning}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <IconButton>
            <HiSpeakerWave size={100} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

type Props = {
  vocabulary: VocabularyOfLessonResponse;
};

export default VocabularyItem;
