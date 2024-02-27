import { CircularProgress, Box } from '@mui/material';

function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
