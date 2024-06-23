import { COLOR_CODE } from '@appConfig';
import { Image } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { Callback } from '@utils';
import { ReactNode } from 'react';

type Props = {
  title?: ReactNode;
  image?: string;
  message?: string;
  onYes?: Callback;
  onNo?: Callback;
  yesText?: string;
  noText?: string;
  isError?: boolean;
};

const StopLearnModal: React.FC<Props> = ({
  message = '',
  onYes = () => {},
  onNo = () => {},
  image,
  title,
  yesText = 'Xác nhận',
  noText = 'Hủy',
  isError = false,
}) => {
  return (
    <Stack gap={2} px={4} justifyContent="center" alignItems="center">
      <Typography fontWeight={800} fontSize={24}>
        {title}
      </Typography>
      <Stack height={350} justifyContent="center" alignItems="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 300,
            height: 300,
            borderRadius: 100,
            backgroundColor: isError ? '#F87171' : COLOR_CODE.PRIMARY_300,
            boxShadow: `0px 0px 0px 30px ${
              isError ? COLOR_CODE.DANGER_BG : COLOR_CODE.PRIMARY_100
            }`,
          }}
        >
          <Image src={image} alt="" sx={{ height: 300, width: 300 }} />
        </Stack>
      </Stack>
      <Typography fontSize={24} fontWeight={800}>
        {message}
      </Typography>
      <Stack
        width={'100%'}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          gap: 2,
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Button
          variant="outlined"
          onClick={onNo}
          color={isError ? 'error' : 'primary'}
          sx={{
            fontWeight: 800,
            boxShadow: `4px 4px 0px ${isError ? COLOR_CODE.DANGER_BG : COLOR_CODE.PRIMARY_400}`,
            '&:hover': {
              boxShadow: `3px 3px 0px ${isError ? COLOR_CODE.DANGER_BG : COLOR_CODE.PRIMARY_400}`,
            },
          }}
        >
          {noText}
        </Button>
        <Button
          variant="contained"
          onClick={onYes}
          color={isError ? 'error' : 'primary'}
          sx={{
            fontWeight: 800,
            boxShadow: `4px 4px 0px ${isError ? COLOR_CODE.DANGER_BG : COLOR_CODE.PRIMARY_600}`,
            '&:hover': {
              boxShadow: `3px 3px 0px ${isError ? COLOR_CODE.DANGER_BG : COLOR_CODE.PRIMARY_600}`,
            },
          }}
        >
          {yesText}
        </Button>
      </Stack>
    </Stack>
  );
};

export default StopLearnModal;
