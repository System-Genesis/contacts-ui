import { Box, Button, Typography } from '@mui/material';
import animationData from '../assets/lottie/notFound.json';
import Lottie from 'react-lottie';

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box sx={{ height: '90vh', width: '65vw', justifySelf: 'center', alignContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 15,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box>
          <Lottie options={defaultOptions} height={500} width={500} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '15rem',
            justifyContent: 'space-around',
            fontFamily: 'Rubik',
          }}
        >
          <Typography
            style={{
              color: '#295C54',
              fontSize: 55,
              fontWeight: '700',
              lineHeight: '35px',
              textAlign: 'center',
              fontFamily: 'Rubik',
            }}
          >
            אופס! שגיאה בלתי צפויה!
          </Typography>
          <Button
            sx={{
              color: '#FFF',
              backgroundColor: '#81C7B7',
              borderRadius: '30px',
              fontFamily: 'Rubik',
              fontSize: 20,
              p: '0 1rem',
              '&:hover': { backgroundColor: '#295C54' },
              '&.Mui-disabled': {
                color: '#FFF',
                backgroundColor: '#BAD1CA',
              },
            }}
            onClick={() => window.location.replace('/')}
          >
            לחץ לחזרה לדף הבית
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
