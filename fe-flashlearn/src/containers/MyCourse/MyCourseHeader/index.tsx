import { COLOR_CODE } from '@appConfig';
import { Stack, Typography } from '@mui/material';

const MyCourseHeader = () => {
  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_CODE.PRIMARY_100,
        boxShadow: '0px 1px 10px 1px rgba(21, 96, 100, 0.1)',
      }}
    >
      <Typography
        fontSize={60}
        fontWeight={900}
        textAlign={'center'}
        py={8}
        color={COLOR_CODE.PRIMARY}
      >
        Khóa học của tôi
      </Typography>
    </Stack>
  );
};

export default MyCourseHeader;
