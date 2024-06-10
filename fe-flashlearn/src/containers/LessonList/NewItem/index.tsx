/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, PATHS } from '@appConfig';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import { isOdd } from '@utils';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

type Props = {
  courseId: string;
  index: number;
};

const NewItem: React.FC<Props> = ({ courseId, index }) => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate(PATHS.lessonsCreate.replace(':courseId', courseId));
  };

  return (
    <Card
      onClick={handleAdd}
      sx={{
        width: '600px',
        height: '140px',
        paddingTop: '15px',
        background: 'transparent',
        justifyContent: 'center',
        boxShadow: 'none',
        ':hover': {
          boxShadow: 'none',
        },
      }}
    >
      <Stack direction={!isOdd(index) ? 'row' : 'row-reverse'} alignItems={'center'}>
        <Stack
          sx={{
            position: 'relative',
            borderRadius: 1000,
            p: 1,
            mx: 3,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: COLOR_CODE.PRIMARY,
              width: 70,
              height: 70,
              '&:hover': {
                backgroundColor: COLOR_CODE.PRIMARY_400,
              },
            }}
          >
            <IoMdAdd size={70} color="white" />
          </IconButton>
        </Stack>
        <Stack>
          <Typography fontSize={24} fontWeight={800} color={COLOR_CODE.GREY_700}>
            Tạo Bài Học mới
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default NewItem;
