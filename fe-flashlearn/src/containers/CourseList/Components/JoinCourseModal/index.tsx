import { COLOR_CODE, PATHS } from '@appConfig';
import { DialogContext, Input } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { useGetMyLearningCourse, useGetStudents, useJoinCourseByCode } from '@queries';
import { Toastify } from '@services';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinCourseModal = () => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const { closeModal } = useContext(DialogContext);
  const { handleInvalidateStudentList } = useGetStudents();
  const { handleInvalidateMyLearningCourseList } = useGetMyLearningCourse();

  const { onJoinCourseByCode } = useJoinCourseByCode({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess(data) {
      Toastify.success('Tham gia lớp học thành công');
      handleInvalidateStudentList();
      handleInvalidateMyLearningCourseList();
      closeModal();
      navigate(PATHS.courseDetail.replace(':courseId', data.data.data.id.toString()));
    },
  });

  const handleSubmit = () => {
    if (text) {
      if (text.length === 6) {
        onJoinCourseByCode({
          code: text,
        });
      } else {
        setError('Mã CODE phải có 6 ký tự');
      }
    }
  };

  return (
    <Stack gap={2} px={4}>
      <Typography fontWeight={800} fontSize={24}>
        Tham Gia Khóa Học
      </Typography>
      <Typography fontSize={20}>
        Nhập mã 6 chữ cái bạn nhận được từ giáo viên của mình. Sau khi tham gia, bạn có thể bắt đầu
        hành trình khám phá tri thức.
      </Typography>
      <Input
        placeholder="Nhập CODE"
        value={text}
        onChange={(e) => {
          setError('');
          setText(e.target.value);
        }}
        errorMessage={error}
      />
      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        sx={{
          gap: 2,
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            fontWeight: 800,
            boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
            '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
          }}
        >
          Xong
        </Button>
      </Stack>
    </Stack>
  );
};

export default JoinCourseModal;
