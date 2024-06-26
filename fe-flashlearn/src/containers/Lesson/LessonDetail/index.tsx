/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES, PATHS } from '@appConfig';
import { DialogContext, DialogType, Image, Loading } from '@components';
import { Button, Divider, Stack, Typography } from '@mui/material';
import {
  useDeleteLesson,
  useGetLesson,
  useGetLessonDetail,
  useGetVocabularyOfLesson,
} from '@queries';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import VocabularyItem from './VocabularyItem';
import { Toastify } from '@services';
import { useContext } from 'react';

const LessonDetail = () => {
  const navigate = useNavigate();
  const { lessonId, courseId } = useParams<{ courseId: string; lessonId: string }>();

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { lessonDetail, isLoading } = useGetLessonDetail({ id: lessonId });

  const { vocabularyOfLesson, isFetching } = useGetVocabularyOfLesson({ lessonId });

  const { handleInvalidateLessonList } = useGetLesson({ courseId });

  const { onDeleteLesson } = useDeleteLesson({
    onSuccess() {
      Toastify.success('Xóa lớp học thành công');
      handleInvalidateLessonList();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
  });

  if (isLoading || isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  const handleBack = () => {
    window.history.back();
  };

  const handleEdit = () => {
    navigate(
      PATHS.lessonsUpdate
        .replace(':lessonId', lessonDetail?.id.toString())
        .replace(':courseId', courseId),
    );
  };

  const handleDelete = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn có chắc chắn muốn xóa bài học này không? ',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Xóa',
      cancelText: 'Không! Đừng Xóa',
      onOk: () => {
        closeModal();
        onDeleteLesson({
          id: lessonDetail?.id.toString(),
        });
      },
    });
    openModal();
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        px: 32,
        gap: 3,
      }}
    >
      <Stack width="100%" justifyContent={'space-between'} direction={'row'}>
        <Button sx={{ alignSelf: 'flex-start' }} onClick={handleBack}>
          <IoChevronBack />
          Trở về
        </Button>
        <Stack direction={'row'} gap={2}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Xóa
          </Button>
          <Button variant="contained" onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" style={{ width: '100%' }} />
      <Stack direction="row" width="100%" gap={4} mx={12}>
        <Image src={lessonDetail?.image || IMAGES.noImage} height={100} />
        <Stack>
          <Typography fontSize={32} fontWeight={800}>
            {lessonDetail?.name}
          </Typography>
          <Typography>{lessonDetail?.description}</Typography>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" style={{ width: '100%' }} />
      {vocabularyOfLesson?.length > 0 ? (
        <>
          {vocabularyOfLesson.map((value) => (
            <VocabularyItem vocabulary={value} />
          ))}
        </>
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Image
            src={IMAGES.noResultsFound}
            style={{ width: '200px', height: '200px', alignSelf: 'center' }}
          />
          <Typography variant="body1" fontWeight={600}>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2">
            Chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm...
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default LessonDetail;
