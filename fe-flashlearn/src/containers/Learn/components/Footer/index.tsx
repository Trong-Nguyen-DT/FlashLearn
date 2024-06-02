import { COLOR_CODE } from '@appConfig';
import { Button, Stack, Typography } from '@mui/material';
import { Callback } from '@utils';

export enum FooterType {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  DEFAULT = 'DEFAULT',
}

type Props = {
  isAnswered: boolean;
  variant?: FooterType;
  step: number;
  setStep: Callback;
  handleCheck?: Callback;
};

const LearnFooter: React.FC<Props> = ({
  variant = FooterType.DEFAULT,
  step,
  setStep,
  handleCheck,
  isAnswered,
}) => {
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        borderTop: '2px solid #E0E0E0',
        alignItems: 'center',
        py: 8,
        ...(variant === FooterType.CORRECT && {
          backgroundColor: COLOR_CODE.SUCCESS_BG,
        }),
        ...(variant === FooterType.INCORRECT && {
          backgroundColor: COLOR_CODE.DANGER_BG,
        }),
      }}
    >
      <Stack sx={{ alignItems: 'end', width: '60%', justifyContent: 'center' }}>
        {isAnswered ? (
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack>
              <Typography fontSize={24} fontWeight={700} color={COLOR_CODE.GREY_600}>
                {variant === FooterType.CORRECT
                  ? 'Đúng'
                  : variant === FooterType.INCORRECT
                  ? 'Sai'
                  : null}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={handleNext}
              size="large"
              sx={{
                fontSize: 24,
                borderRadius: 3,
                height: 56,
                width: 180,
                ...(variant === FooterType.DEFAULT && {
                  boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
                  '&:hover': {
                    boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}`,
                  },
                }),
                ...(variant === FooterType.CORRECT && {
                  backgroundColor: COLOR_CODE.SUCCESS,
                  boxShadow: `3px 3px 0px ${COLOR_CODE.SUCCESS_DARK}`,
                  '&:hover': {
                    backgroundColor: COLOR_CODE.SUCCESS,
                    boxShadow: `3px 3px 0px ${COLOR_CODE.SUCCESS_DARK}`,
                  },
                }),
                ...(variant === FooterType.INCORRECT && {
                  backgroundColor: COLOR_CODE.DANGER,
                  boxShadow: `3px 3px 0px ${COLOR_CODE.DANGER_DARK}`,
                  '&:hover': {
                    backgroundColor: COLOR_CODE.SUCCESS,
                    boxShadow: `3px 3px 0px ${COLOR_CODE.DANGER_DARK}`,
                  },
                }),
              }}
            >
              Tiếp tục
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            onClick={handleCheck}
            size="large"
            sx={{
              fontSize: 24,
              borderRadius: 3,
              height: 56,
              width: 180,
              boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
              '&:hover': {
                boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}`,
              },
            }}
          >
            Kiểm tra
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default LearnFooter;
