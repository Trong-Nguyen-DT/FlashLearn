import { COLOR_CODE } from '@appConfig';
import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  content: string;
  icon?: React.ReactNode;
  color?: string;
};

const PreviewItem: React.FC<Props> = ({ title, content, icon, color = COLOR_CODE.PRIMARY }) => {
  return (
    <Stack
      sx={{
        width: '300px',
        mt: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color,
        borderRadius: 10,
        p: 0.75,
      }}
    >
      <Typography fontSize={20} fontWeight={700} color={COLOR_CODE.WHITE} whiteSpace={'nowrap'}>
        {title}
      </Typography>
      <Stack
        sx={{
          background: 'white',
          borderRadius: 9,
          width: '100%',
          py: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
        <Typography fontSize={32} fontWeight={700} color={color}>
          {content}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PreviewItem;
