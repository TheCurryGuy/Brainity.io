import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ErrorRoute() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          mt: 2,
          px: 3,
          py: 1,
        }}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default ErrorRoute;
