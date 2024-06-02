import { COLOR_CODE } from '@appConfig';
import { Stack, Typography } from '@mui/material';
import { FaRepeat } from 'react-icons/fa6';

const RepeatIcon = () => {
  return (
    <Stack direction="row" gap={2} width={'50%'} alignItems={'center'}>
      <FaRepeat size={24} color={COLOR_CODE.DANGER} />
      <Typography fontSize={24} fontWeight={700} color={COLOR_CODE.DANGER}>
        Lỗi sai trước đây
      </Typography>
    </Stack>
  );
};

export default RepeatIcon;
