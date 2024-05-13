import { Grid, Stack, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack gap={6} py={7} pl={6} pr={8}>
          <Typography variant="h2" fontWeight={600}>
            Dashboard
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
