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
        height: `${location.pathname === '/' ? '32%' : '6%'}`,
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
          transition: 'border-radius 1s',
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
