import { COLOR_CODE, IMAGES } from '@appConfig';
import { Image } from '@components';
import { Stack, Typography } from '@mui/material';
import { ProgressPayload, useUpdateLearnProgress } from '@queries';
import { Callback } from '@utils';
import LearnFooter from '../Footer';
import PreviewItem from './PreviewItem';
import { useEffect } from 'react';

type Props = {
  courseId: string;
  xp: ProgressPayload[];
  step: number;
  setStep: Callback;
};

const Preview: React.FC<Props> = ({ xp, step, setStep, courseId }) => {
  const { onUpdateLearnProgress, isLoading } = useUpdateLearnProgress();

  const totalXP = xp.reduce((acc, item) => acc + item.quality, 0);
  console.log("🚀 ~ totalXP:", totalXP)

  useEffect(() => {
    
    onUpdateLearnProgress({ courseId: courseId, learningVocabularies: xp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Stack sx={{ width: '60%', flexGrow: 1, alignItems: 'center' }}>
        <Stack height={350} justifyContent="center" alignItems="center">
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 300,
              height: 300,
              borderRadius: 100,
              backgroundColor: COLOR_CODE.PRIMARY_300,
              boxShadow: `0px 0px 0px 30px ${COLOR_CODE.PRIMARY_100}`,
            }}
          >
            <Image src={IMAGES.niceImage} alt="" sx={{ height: 300, width: 300 }} />
          </Stack>
        </Stack>
        <Typography fontSize={40} fontWeight={700} color={COLOR_CODE.GREY_600}>
          Bạn đã Hoàn thành bài học
        </Typography>
        <PreviewItem title="Tổng Điểm XP" content={totalXP.toString()} />
      </Stack>
      <LearnFooter isAnswered={true} step={step} setStep={setStep} />
    </Stack>
  );
};

export default Preview;
