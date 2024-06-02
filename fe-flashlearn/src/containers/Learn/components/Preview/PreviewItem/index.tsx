import { COLOR_CODE } from '@appConfig';
import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  content: string;
  icon?: React.ReactNode;
};

const PreviewItem: React.FC<Props> = ({ title, content, icon }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        mt: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_600}>
        {title}
      </Typography>
      <Stack>
        {icon}
        <Typography fontSize={32} fontWeight={700} color={COLOR_CODE.GREY_600}>
          {content}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PreviewItem;
