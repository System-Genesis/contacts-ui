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
    <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 15,
          backgroundColor: '#f9f9f9',
          padding: '0 10rem 0 0'
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
            אופס! משהו השתבש...
          </Typography>
          <Box>
            <Typography
              style={{
                color: '#383F51',
                fontSize: 28,
                fontWeight: '400',
                fontFamily: 'Rubik',
              }}
            >
              נראה שקרתה תקלה בלתי צפויה.
            </Typography>
            <Typography
              style={{
                color: '#383F51',
                fontSize: 28,
                fontWeight: '400',
                fontFamily: 'Rubik',
              }}
            >
              אנחנו מצטערים על חוסר הנוחות.
            </Typography>
          </Box>

          <Button
            sx={{
              color: '#FFF',
              backgroundColor: '#6e938d',
              borderRadius: '30px',
              fontFamily: 'Rubik',
              fontSize: 20,
              p: '0 1rem',
              '&:hover': { backgroundColor: '#445955' },
            }}
            onClick={() => window.location.replace('/')}
          >
            לחיצה לחזרה לדף הבית
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
