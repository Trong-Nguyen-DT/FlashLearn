/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, IMAGES, NAVBAR_HEIGHT } from '@appConfig';
import { Image } from '@components';
import {
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import CourseInfoForm from './CourseInfoForm';

const CreateCourse = () => {
  const [step, setStep] = useState<number>(1);
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  const handleBack = () => {
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
        pt: `${NAVBAR_HEIGHT}px`,
        alignItems: 'center',
      }}
    >
      <Stack direction="row" p={3} px={12} gap={3} width="80%" justifyContent="center">
        <Tooltip title="Trở về" arrow placement="top">
          <IconButton>
            <IoArrowBack onClick={handleBack} />
          </IconButton>
        </Tooltip>
        <Stack width="80%" justifyContent="center">
          <LinearProgress
            variant="determinate"
            value={step === 1 ? 0 : 50}
            sx={{
              background: COLOR_CODE.GREY_200,
              height: '10px',
              borderRadius: 5,
              '.MuiLinearProgress-bar': {
                background: COLOR_CODE.SUCCESS,
                height: '10px',
                borderRadius: 5,
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack gap={2} width={'100%'}>
        <Image
          src={step === 1 ? IMAGES.teaching : IMAGES.poseImage}
          sx={{ height: 200, objectFit: 'contain', mt: 3 }}
        />
        <Typography textAlign="center" fontSize={32} fontWeight={1000} mb={4}>
          {step === 1 ? 'Tạo khóa học' : 'Chọn ảnh cho khóa học'}
        </Typography>
      </Stack>
      <CourseInfoForm step={step} setStep={setStep} />
    </Stack>
  );
};

export default CreateCourse;
