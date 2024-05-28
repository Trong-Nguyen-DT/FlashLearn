import { COLOR_CODE } from '@appConfig';
import { DialogContext, Input } from '@components';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useAddStudents, useGetCourseDetail, useGetStudents } from '@queries';
import { Toastify } from '@services';
import { isEmpty } from 'lodash';
import { useContext, useState } from 'react';

type Props = {
  courseId: string;
};

const AddStudentModal: React.FC<Props> = ({ courseId }) => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { courseDetail } = useGetCourseDetail({ id: courseId });

  const { closeModal } = useContext(DialogContext);
  const { handleInvalidateStudentList } = useGetStudents();

  const { onAddNewStudents } = useAddStudents({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess() {
      Toastify.success('Thêm học viên thành công');
      handleInvalidateStudentList();
      closeModal();
    },
  });

  const validateEmails = (input: string) => {
    if (isEmpty(input)) {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lines = input.split('\n');
    const validEmails = [];
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!emailRegex.test(trimmedLine)) {
        return false;
      }
      validEmails.push(trimmedLine);
    }
    return validEmails;
  };

  const handleSubmit = () => {
    const emails = validateEmails(text);
    if (emails) {
      if ((emails as string[]).length > 0) {
        onAddNewStudents({
          courseId,
          emailStudents: emails as string[],
        });
      }
      closeModal();
    } else {
      setError('Có Email không đúng định dạng');
    }
  };

  return (
    <Stack gap={2} px={4}>
      <Typography fontWeight={800} fontSize={24}>
        Thêm học viên
      </Typography>
      <Typography fontWeight={800} fontSize={24} textAlign={'center'}>
        Sử dụng mã Code
      </Typography>
      <Stack direction="row" gap={1} justifyContent={'space-between'}>
        <Typography fontSize={20} width={'57%'}>
          Yêu cầu học viên truy cập <b>flash-learning/courses</b> và nhập mã lớp{' '}
          <b>{courseDetail?.name}</b>
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(courseDetail?.name);
          }}
          sx={{
            fontWeight: 800,
            boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_400}`,
            '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_400}` },
          }}
        >
          Copy Code
        </Button>
      </Stack>
      <Stack direction={'row'} gap={1} alignItems="center" justifyContent={'center'}>
        <Divider flexItem sx={{ width: '45%', mb: 1.5 }} />
        <Typography fontWeight={800} fontSize={20} textAlign={'center'} color={COLOR_CODE.GREY_400}>
          Hoặc
        </Typography>
        <Divider flexItem sx={{ width: '45%', mb: 1.5 }} />
      </Stack>
      <Typography fontWeight={800} fontSize={24} textAlign={'center'}>
        Thêm bằng email
      </Typography>
      <Typography fontSize={20}>Vui lòng điền mỗi email 1 dòng</Typography>
      <Input
        rows={3}
        multiline
        placeholder="Nhập mỗi email một dòng"
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

export default AddStudentModal;
