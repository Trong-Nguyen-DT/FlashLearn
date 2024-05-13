import { COLOR_CODE } from '@appConfig';
import { Box } from '@mui/material';

export const BoxTableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: COLOR_CODE.WHITE,
      p: 2,
      mt: 1,
      border: `${COLOR_CODE.GREY_100}`,
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);
