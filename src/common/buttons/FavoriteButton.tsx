import { Fade, IconButton } from '@mui/material';
import favStar from '../../assets/icons/favStar.svg';
import unFavStar from '../../assets/icons/unFavStar.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavoriteRequest, getMyFavoritesRequest, removeFavoriteRequest } from '../../services/favoriteService';

export const FavoriteButton = ({ id, type, style }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({ queryKey: ['myFavorites'], queryFn: getMyFavoritesRequest, initialData: [] });

  const isFavorite = data.map((f) => f.id).includes(id);

  const mutation = useMutation({
    mutationFn: () => {
      return isFavorite ? removeFavoriteRequest({ id }) : addFavoriteRequest({ id, type });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
    },
  });

  return (
    <IconButton sx={style} disableRipple onClick={() => mutation.mutate}>
      <Fade in={isFavorite} timeout={200}>
        <img
          style={{
            position: 'absolute',
            top: '20px',
          }}
          src={favStar}
        />
      </Fade>

      <Fade in={!isFavorite} timeout={200}>
        <img
          style={{
            position: 'absolute',
            top: '20px',
          }}
          src={unFavStar}
        />
      </Fade>
    </IconButton>
  );
};
