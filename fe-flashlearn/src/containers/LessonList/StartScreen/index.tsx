/* eslint-disable @typescript-eslint/no-explicit-any */
import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';

const steps = [
  {
    label: 'Tạo mới khóa học',
  },
  {
    label: 'Thêm học viên',
    description:
      'Mời các học viên tham gia lớp học của bạn để bắt đầu bắt đầu hành trình khám phá kiến thức của họ',
  },
  {
    label: 'Tạo bài học',
    description: `Hãy tạo bài học để xây dựng nội dung học tập mới như bài giảng, bài tập và tài liệu. Hãy mang đến trải nghiệm học tập phong phú cho học viên của bạn.`,
  },
];

const StartScreen = () => {
  return (
    <Stepper activeStep={0} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
          >
            {step.label}
          </StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default StartScreen;
