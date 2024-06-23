import { COLOR_CODE } from '@appConfig';
import { Loading } from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { Callback } from '@utils';
import { FaCheck } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import './styles.scss';

export enum FooterType {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  DEFAULT = 'DEFAULT',
}

type Props = {
  isAnswered: boolean;
  variant?: FooterType;
  handleNext: Callback;
  handleCheck?: Callback;
  isLoading?: boolean;
  isDisableCheck?: boolean;
  correctAnswer?: string;
};

const LearnFooter: React.FC<Props> = ({
  variant = FooterType.DEFAULT,
  handleNext,
  handleCheck,
  isAnswered,
  isLoading,
  isDisableCheck,
  correctAnswer,
}) => {
  return (
    <Stack
      sx={{
        width: '100%',
        borderTop: '2px solid #E0E0E0',
        alignItems: 'center',
        py: 4,
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
          <Stack direction="row" justifyContent="space-between" width="100%" alignItems={'center'}>
            <Stack direction="row" width="100%" gap={2} alignItems="center">
              {variant === FooterType.CORRECT ? (
                <Stack
                  className="jello-horizontal"
                  sx={{
                    alignItems: 'center',
                    width: 100,
                    height: 100,
                    backgroundColor: 'white',
                    borderRadius: 50,
                  }}
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <FaCheck size={40} color={COLOR_CODE.SUCCESS} />
                </Stack>
              ) : variant === FooterType.INCORRECT ? (
                <Stack
                  className="jello-horizontal"
                  sx={{
                    alignItems: 'center',
                    width: 100,
                    height: 100,
                    backgroundColor: 'white',
                    borderRadius: 50,
                  }}
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <CgClose size={40} color={COLOR_CODE.DANGER} />
                </Stack>
              ) : (
                <Stack
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
              {variant === FooterType.CORRECT ? (
                <Typography fontSize={30} fontWeight={800} color={COLOR_CODE.SUCCESS}>
                  Làm tốt lắm!
                </Typography>
              ) : variant === FooterType.INCORRECT ? (
                <Stack>
                  <Typography fontSize={30} fontWeight={800} color={COLOR_CODE.DANGER}>
                    Đáp án đúng:
                  </Typography>
                  <Typography fontSize={20} fontWeight={800} color={COLOR_CODE.DANGER}>
                    {correctAnswer}
                  </Typography>
                </Stack>
              ) : null}
            </Stack>
            <Button
              variant="contained"
              onClick={handleNext}
              size="large"
              startIcon={isLoading && <Loading size="small" />}
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
                    backgroundColor: COLOR_CODE.DANGER,
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
            disabled={isDisableCheck}
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
