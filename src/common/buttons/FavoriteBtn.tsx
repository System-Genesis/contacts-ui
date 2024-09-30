import { Fade, IconButton, styled } from '@mui/material';
import { useState } from 'react';
import unFavStar from '../../assets/icons/unFavStar.svg';
import favStar from '../../assets/icons/favStar.svg';

const StyledFade = styled(Fade)({
  position: 'absolute',
  top: '8px',
  left: '8px', // Adjust as needed
  zIndex: 1, // Ensure it appears above other elements
});

export const FavoriteBtn = () => {
  const [fav, setFav] = useState(true);

  return (
    <IconButton
      aria-label="chatbot"
      size="large"
      onClick={() => setFav((prev) => !prev)}
      sx={{
        position: 'absolute',
        background: 'transparent', // No background
      }}
    >
      <StyledFade in={fav} timeout={500}>
        <img alt="Chatbot Icon" src={favStar} />
      </StyledFade>
      <StyledFade in={!fav} timeout={500}>
        <img alt="Chatbot Icon" src={unFavStar} />
      </StyledFade>
    </IconButton>
  );
};
