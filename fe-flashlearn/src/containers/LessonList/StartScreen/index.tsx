/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, PATHS } from '@appConfig';
import {
  Button,
  Stack,
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
  courseId: string;
};

const StartScreen: React.FC<Props> = ({ courseId }) => {
  const navigate = useNavigate();

  const handleAddStudent = () => {
    // TODO: Add student
  };

  const handleAddLesson = () => {
    navigate(PATHS.lessonsCreate.replace(':courseId', courseId));
  };

  const steps = [
    {
      label: 'Tạo mới khóa học',
    },
    {
      label: 'Thêm học viên',
      description: (
        <Stack gap={2}>
          <Typography>
            Mời các học viên tham gia lớp học của bạn để bắt đầu bắt đầu hành trình khám phá kiến
            thức của họ
          </Typography>
          <Button variant="contained" onClick={handleAddStudent}>
            Thêm học viên
          </Button>
        </Stack>
      ),
    },
    {
      label: 'Tạo bài học',
      description: (
        <Stack gap={2}>
          <Typography>
            Hãy tạo bài học để xây dựng nội dung học tập mới như bài giảng, bài tập và tài liệu. Hãy
            mang đến trải nghiệm học tập phong phú cho học viên của bạn.
          </Typography>
          <Button variant="outlined" onClick={handleAddLesson}>
            Tạo bài học
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <Stepper
      activeStep={0}
      orientation="vertical"
      connector={
        <StepConnector
          sx={{
            '& .MuiStepConnector-lineVertical': {
              borderWidth: 2,
              ml: 1.5,
            },
          }}
        />
      }
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={() => (
              <Stack
                sx={{
                  borderRadius: 100,
                  width: '40px',
                  height: '40px',
                  border: `1px solid ${index === 0 ? COLOR_CODE.SUCCESS : COLOR_CODE.GREY_100}`,
                  backgroundColor: index !== 0 && COLOR_CODE.GREY_100,
                  boxShadow: index === 0 && `0px 0px 0px 3px ${COLOR_CODE.SUCCESS_BG}`,
                  justifyContent: 'center',
                }}
              >
                {index === 0 ? (
                  <FaCheckCircle size={40} color={COLOR_CODE.SUCCESS} />
                ) : (
                  <Typography
                    sx={{
                      color: COLOR_CODE.GREY_600,
                      lineHeight: '24px',
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </Typography>
                )}
              </Stack>
            )}
            sx={{
              '& .MuiStepLabel-label': {
                fontWeight: 800,
                fontSize: '20px',
                color: index === 0 ? COLOR_CODE.SUCCESS : COLOR_CODE.GREY_700,
                '&.Mui-completed': {
                  color: COLOR_CODE.SUCCESS,
                  fontWeight: 800,
                },
                '&.Mui-active': {
                  fontWeight: 800,
                  color: COLOR_CODE.SUCCESS,
                },
              },
            }}
          >
            {step.label}
          </StepLabel>
          <StepContent
            TransitionProps={{ in: true }}
            sx={{
              width: 400,
              fontSize: '20px',
              borderWidth: 2,
              ml: 3,
            }}
          >
            <Typography>{step.description}</Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default StartScreen;
