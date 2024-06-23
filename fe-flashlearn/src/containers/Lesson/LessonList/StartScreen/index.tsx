/* eslint-disable @typescript-eslint/no-explicit-any */
import AddStudentModal from '@/containers/Student/AddStudentModal';
import { COLOR_CODE, PATHS } from '@appConfig';
import { DialogContext, DialogType } from '@components';
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
import { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
  courseId: string;
};

const StartScreen: React.FC<Props> = ({ courseId }) => {
  const navigate = useNavigate();

  const { setDialogContent, openModal } = useContext(DialogContext);

  const handleAddStudent = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: <AddStudentModal courseId={courseId} />,
      hideTitle: true,
      maxWidth: 'md',
    });
    openModal();
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
          <Button
            variant="contained"
            onClick={handleAddStudent}
            sx={{
              width: 200,
              fontWeight: 800,
              boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
              '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
            }}
          >
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
          <Button
            variant="outlined"
            onClick={handleAddLesson}
            sx={{
              width: 200,
              fontWeight: 800,
              boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_400}`,
              '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_400}` },
            }}
          >
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
                  border: `2px solid ${index === 0 ? COLOR_CODE.PRIMARY : COLOR_CODE.GREY_100}`,
                  backgroundColor: index !== 0 && COLOR_CODE.GREY_100,
                  boxShadow: index === 0 && `0px 0px 0px 4px ${COLOR_CODE.PRIMARY_200}`,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {index === 0 ? (
                  <FaCheckCircle size={40} color={COLOR_CODE.PRIMARY} />
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
                color: index === 0 ? COLOR_CODE.PRIMARY : COLOR_CODE.GREY_700,
                '&.Mui-completed': {
                  color: COLOR_CODE.PRIMARY,
                  fontWeight: 800,
                },
                '&.Mui-active': {
                  fontWeight: 800,
                  color: COLOR_CODE.PRIMARY,
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
