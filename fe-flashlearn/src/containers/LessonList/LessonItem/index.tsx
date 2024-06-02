/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, IMAGES, PATHS } from '@appConfig';
import { Image } from '@components';
import { Box, Button, Card, CircularProgress, Popover, Stack, Typography } from '@mui/material';
import { LessonResponse } from '@queries';
import { isOdd } from '@utils';
import { isNaN } from 'lodash';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
  courseId: string;
  lesson: LessonResponse;
  index: number;
  isNext?: boolean;
};

const LessonItem: React.FC<Props> = ({ lesson, index, courseId, isNext }) => {
  console.log('🚀 ~ isNext:', isNext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(
      PATHS.lessonsDetail
        .replace(':lessonId', lesson?.id.toString())
        .replace(':courseId', courseId),
    );
  };

  const handleLearn = () => {
    isLearned
      ? navigate(`${PATHS.practiceLesson.replace(':courseId', courseId)}?lessonId=${lesson?.id}`)
      : navigate(`${PATHS.learning.replace(':courseId', courseId)}?lessonId=${lesson?.id}`);
  };

  const progress = lesson?.totalVocabLearned / lesson?.totalVocabOfLesson;
  const learnPercentage = isNaN(progress) ? 0 : progress * 100;

  const isLearned = lesson.learned && learnPercentage === 100;

  const isActive = lesson.learned || (learnPercentage !== 0 && learnPercentage !== 100) || isNext;

  return (
    <Stack>
      <Card
        onClick={handleClick}
        sx={{
          width: '600px',
          height: '140px',
          paddingTop: '15px',
          background: 'transparent',
          justifyContent: 'center',
          boxShadow: 'none',
          ...(learnPercentage === 0 && !isNext
            ? {
                filter: 'grayscale(100%)',
                opacity: 0.5,
                ':hover': {
                  boxShadow: 'none',
                  transform: 'none !important',
                  transition: 'none !important',
                },
              }
            : {
                ':hover': {
                  boxShadow: 'none',
                  color: COLOR_CODE.PRIMARY,
                  '& .MuiTypography-root': {
                    color: COLOR_CODE.PRIMARY,
                  },
                },
              }),

          ...(learnPercentage === 100 && {
            boxShadow: 'none',
            color: COLOR_CODE.PRIMARY,
            fontSize: 24,
            '& .MuiTypography-root': {
              color: COLOR_CODE.PRIMARY,
            },
          }),
        }}
      >
        <Stack direction={!isOdd(index) ? 'row' : 'row-reverse'} alignItems={'center'}>
          <Stack
            sx={{
              position: 'relative',
              borderRadius: 1000,
              p: 1,
              mx: 3,
              border: `3px solid ${isActive ? COLOR_CODE.PRIMARY : '#f1f1f1'}`,
            }}
          >
            <Image
              className={`lesson-${index}`}
              sx={{
                height: '100px',
                width: '100px',
                objectFit: 'cover',
                borderRadius: 50,
              }}
              src={lesson?.image ?? IMAGES.noImage}
            />
            <CircularProgress
              variant="determinate"
              value={100}
              size={150}
              sx={{
                position: 'absolute',
                color: COLOR_CODE.GREY_100,
                top: '0',
                left: '0',
                marginTop: '-17px',
                marginLeft: '-17px',
              }}
            />
            <CircularProgress
              variant="determinate"
              value={isActive ? learnPercentage : 0}
              size={150}
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                marginTop: '-17px',
                marginLeft: '-17px',
              }}
            />
          </Stack>
          <Stack>
            <Typography fontSize={24} fontWeight={800} color={COLOR_CODE.GREY_700}>
              {lesson?.name}
            </Typography>
            <Typography>
              {lesson?.totalVocabLearned}/{lesson?.totalVocabOfLesson}
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: !isOdd(index) ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
          },
        }}
      >
        <Stack>
          <Box
            sx={{
              position: 'relative',
              mb: '10px',
              ...(isOdd(index)
                ? {
                    mr: 20,
                  }
                : {
                    ml: 20,
                  }),
              '&::before': {
                backgroundColor: isActive ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_300,
                content: '""',
                display: 'block',
                position: 'absolute',
                width: 14,
                height: 14,
                bottom: -6,
                transform: 'rotate(45deg)',
                left: 'calc(50% - 6px)',
              },
            }}
          >
            <Stack
              sx={{
                background: isActive ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_300,
                borderRadius: 3,
                p: 2,
                width: '500px',
                alignItems: !isActive && 'center',
              }}
            >
              <Typography fontSize={24} fontWeight={800} color="white">
                {lesson?.name}
              </Typography>
              <Typography color="white">{lesson?.description}</Typography>
              {isActive ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleViewDetail}
                    sx={{
                      mt: 2,
                      fontWeight: 800,
                      boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                      '&:hover': {
                        boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}`,
                      },
                    }}
                  >
                    Chi tiết Khóa học
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleLearn}
                    sx={{
                      mt: 2,
                      fontWeight: 800,
                      boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                      '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
                    }}
                    color="primary"
                  >
                    {isLearned ? 'Ôn Tập' : 'Học'}
                  </Button>
                </>
              ) : (
                <FaLock size={50} color="white" />
              )}
            </Stack>
          </Box>
        </Stack>
      </Popover>
    </Stack>
  );
};

export default LessonItem;
