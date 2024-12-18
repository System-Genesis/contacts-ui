import heroBackground from '../../assets/images/heroBackground.svg';
import heroLayer from '../../assets/images/heroLayer.svg';
import { Box } from '@mui/material';
import { SearchBar } from '../../common/searchBar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const location = useLocation();

  const [isHome, setIsHome] = useState(location.pathname === '/');

  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: `${isHome ? '45%' : '8%'}`,
        width: '85%',
        margin: '1rem 0rem 2rem',
        position: 'relative',
        alignSelf: 'center',
        transition: 'height 0.7s',
      }}
    >
      <>
        <img
          src={heroBackground}
          style={{
            width: '100%',
            objectFit: 'cover',
            objectPosition: `${isHome ? 'bottom' : 'top'}`,
            borderRadius: `${isHome ? '2rem' : '1rem'}`,
            transition: 'border-radius 0.7s, filter 0.4s',
            filter: isHome ? '' : 'brightness(0.9) saturate(2) contrast(1.1)',
          }}
        />
        <img
          src={heroLayer}
          style={{
            width: '100%',
            position: 'absolute',
            objectFit: 'cover',
            height: '100%',
            overflow: 'hidden',
            objectPosition: 'top',
            borderRadius: `${isHome ? '2rem' : '1rem'}`,
            opacity: isHome ? 1 : 0,
            transition: 'opacity 0.4s',
          }}
        />
      </>

      <Box
        sx={{
          position: 'absolute',
          bottom: `${isHome ? '-9%' : '-30%'}`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          transition: 'bottom 0.7s',
        }}
      >
        <SearchBar />
      </Box>
    </Box>
  );
};
