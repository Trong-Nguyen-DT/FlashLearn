/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, IMAGES, PATHS } from '@appConfig';
import { Image } from '@components';
import { Box, Button, Card, Popover, Stack, Typography } from '@mui/material';
import { LessonResponse } from '@queries';
import { isOdd } from '@utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shakeAnimation.scss';

type Props = {
  courseId: string;
  lesson: LessonResponse;
  index: number;
  learnProgress?: number;
};

const LessonItem: React.FC<Props> = ({ lesson, index, learnProgress, courseId }) => {
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
    navigate(
      PATHS.lessonsDetail
        .replace(':lessonId', lesson?.id.toString())
        .replace(':courseId', courseId),
    );
  };

  return (
    <Stack>
      <Card
        onClick={handleClick}
        sx={{
          width: '600px',
          background: 'transparent',
          justifyContent: 'center',
          boxShadow: 'none',
          ...(learnProgress === 0
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
        }}
      >
        <Stack direction={!isOdd(index) ? 'row' : 'row-reverse'} alignItems={'center'}>
          <Stack
            sx={{
              borderRadius: 1000,
              p: 1,
              mx: 2,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f1f1',
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
          </Stack>
          <Stack>
            <Typography fontSize={24} fontWeight={800} color={COLOR_CODE.GREY_700}>
              {lesson?.name}
            </Typography>
            <Typography>0/{lesson?.totalVocabOfLesson}</Typography>
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
                backgroundColor: COLOR_CODE.PRIMARY_500,
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
                background: COLOR_CODE.PRIMARY_500,
                borderRadius: 3,
                p: 2,
                width: '500px',
              }}
            >
              <Typography fontSize={24} fontWeight={800} color="white">
                {lesson?.name}
              </Typography>
              <Typography color="white">{lesson?.description}</Typography>
              <Button
                variant="outlined"
                onClick={handleViewDetail}
                sx={{ mt: 2, fontWeight: 800 }}
                color="primary"
              >
                Chi tiết Khóa học
              </Button>
              <Button
                variant="outlined"
                onClick={handleLearn}
                sx={{ mt: 2, fontWeight: 800 }}
                color="primary"
              >
                Học
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Popover>
    </Stack>
  );
};

export default LessonItem;
