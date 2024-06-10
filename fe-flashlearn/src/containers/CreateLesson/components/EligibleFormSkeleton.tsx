import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const FormSkeleton = () => (
  <Box>
    <Stack direction="row" alignItems="center" className="mt-8 mb-16">
      <Typography variant="h4">
        <Skeleton variant="text" width={100} />
      </Typography>
    </Stack>
    <Grid container>
      <Grid item xs={12}>
        <Skeleton variant="text" width={75} />
        <Skeleton height={56} />
      </Grid>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid item xs={index % 2 === 1 ? 2 : 4} key={uuidv4()}>
          <Skeleton variant="text" width={75} />
          <Skeleton height={56} />
        </Grid>
      ))}
    </Grid>
    <Stack direction="row" justifyContent="flex-end" mt={4} mb={2}>
      <Button type="button" variant="outlined" className="mr-16" disabled>
        Cancel
      </Button>
      <Button type="button" disabled />
    </Stack>
  </Box>
);

export default FormSkeleton;
