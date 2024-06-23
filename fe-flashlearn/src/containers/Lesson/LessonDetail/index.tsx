/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from '@appConfig';
import { Image, Loading } from '@components';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useGetLessonDetail, useGetVocabularyOfLesson } from '@queries';
import { IoChevronBack } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import VocabularyItem from './VocabularyItem';

const LessonDetail = () => {
  const { lessonId } = useParams<{ courseId: string; lessonId: string }>();

  const { lessonDetail, isLoading } = useGetLessonDetail({ id: lessonId });

  const { vocabularyOfLesson, isFetching } = useGetVocabularyOfLesson({ lessonId });

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

  return (
    <Stack
      sx={{
        alignItems: 'center',
        pt: 6,
        px: 32,
        gap: 3,
      }}
    >
      <Stack width="100%">
        <Button sx={{ alignSelf: 'flex-start' }} onClick={handleBack}>
          <IoChevronBack />
          Trở về
        </Button>
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
