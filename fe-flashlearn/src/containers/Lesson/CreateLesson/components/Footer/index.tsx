import { COLOR_CODE } from '@appConfig';
import { Button, Stack } from '@mui/material';
import './styles.scss';
import { Loading } from '@components';

interface Props {
  isLoading: boolean;
}

const CreateLessonFooter = ({ isLoading }: Props) => {
  return (
    <Stack
      sx={{
        width: '100%',
        borderTop: '2px solid #E0E0E0',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Stack sx={{ alignItems: 'end', width: '60%', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={isLoading}
          startIcon={isLoading && <Loading size="small" />}
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
          Xong
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateLessonFooter;
