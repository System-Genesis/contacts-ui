import { IconButton } from '@mui/material';
import { useState } from 'react';
import favStar from '../assets/icons/favStar.svg';
import unFavStar from '../assets/icons/unFavStar.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavoriteRequest, removeFavoriteRequest } from '../services/my';

export const FavoriteButton = ({ id, type }) => {
  const queryClient = useQueryClient();

  const [fav, setFav] = useState(true);

  const mutation = useMutation({
    mutationFn: () => {
      setFav((prev) => !prev);
      return fav ? removeFavoriteRequest({ id }) : addFavoriteRequest({ id, type });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
    },
  });

  return (
    <IconButton
      sx={{
        position: 'relative',
        right: '40%',
      }}
      disableRipple
      onClick={mutation.mutate}
    >
      <img
        style={{
          position: 'absolute',
          top: '20px',
        }}
        src={fav ? favStar : unFavStar}
      />
    </IconButton>
  );
};
