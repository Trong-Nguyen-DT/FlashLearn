import { COLOR_CODE, IMAGES, PATHS } from '@appConfig';
import { Image } from '@components';
import { Stack, Typography } from '@mui/material';
import { LearnQuestionResponse, ProgressPayload } from '@queries';
import { Callback } from '@utils';
import { FaBoltLightning } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import LearnFooter from '../Footer';
import PreviewItem from './PreviewItem';

type Props = {
  courseId: string;
  xp: ProgressPayload[];
  step: number;
  setStep: Callback;
  learnContent: LearnQuestionResponse;
  invalidCallback: Callback;
};

const Preview: React.FC<Props> = ({ xp, courseId, learnContent, invalidCallback }) => {
  const navigate = useNavigate();

  const totalXP = ((xp.reduce((acc, item) => acc + item.quality, 0) / 6) * 1000).toFixed(0);

  const totalCorrect = (
    (xp.reduce((acc, item) => acc + Math.floor(item.quality), 0) / learnContent.questions.length) *
    100
  ).toFixed(0);

  const handleNext = () => {
    navigate(PATHS.courseDetail.replace(':courseId', courseId));
    invalidCallback();
  };

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
          Bạn đã hoàn thành bài học
        </Typography>
        <Stack direction={'row'} gap={2}>
          <PreviewItem
            title="Tổng Điểm XP"
            content={totalXP.toString()}
            icon={<FaBoltLightning color={COLOR_CODE.PRIMARY} size={50} />}
            color={COLOR_CODE.PRIMARY}
          />
          <PreviewItem
            title="Chính Xác"
            content={`${totalCorrect.toString()}%`}
            icon={<GoGoal color={COLOR_CODE.SUCCESS} size={50} />}
            color={COLOR_CODE.SUCCESS}
          />
        </Stack>
      </Stack>
      <LearnFooter isAnswered={true} handleNext={handleNext} />
    </Stack>
  );
};

export default Preview;
