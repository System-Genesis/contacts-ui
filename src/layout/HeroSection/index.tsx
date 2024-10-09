import heroBackground from '../../assets/images/heroBackground.svg';
import { Box } from '@mui/material';
import { SearchBar } from '../../common/SearchBar';
import { useLocation } from 'react-router-dom';

export const HeroSection = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: `${location.pathname === '/' ? '45%' : '8%'}`,
        width: '75%',
        margin: '2rem',
        position: 'relative',
        alignSelf: 'center',
        transition: 'height 1s',
      }}
    >
      <img
        src={heroBackground}
        style={{
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: `${location.pathname === '/' ? '2rem' : '1rem'}`,
          transition: 'border-radius 1s, filter 1s',
          // filter: location.pathname === '/' ? '' : 'brightness(0.9) saturate(2) contrast(1.1)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: `${location.pathname === '/' ? '-9%' : '-30%'}`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          transition: 'bottom 1s',
        }}
      >
        <SearchBar />
      </Box>
    </Box>
  );
};
