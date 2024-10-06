import { Box, Grid } from '@mui/material';
import EmptyFavorites from '../../assets/icons/emptyFavorites.svg';
import { EntityFavoriteCard } from './Favorites/Favorite/EntityFavoriteCard';
import { useQuery } from '@tanstack/react-query';
import { getMyFavoritesRequest } from '../../services/my';
import { GroupFavoriteCard } from './Favorites/Favorite/GroupFavoriteCard';

const Home = () => {
  const { data } = useQuery({ queryKey: ['myFavorites'], queryFn: getMyFavoritesRequest, initialData: [] });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        maxHeight: '100vh',
      }}
    >
      {data.length === 0 && (
        <Grid display={'flex'} justifyContent={'center'} paddingY={'80px'}>
          <img src={EmptyFavorites} />
        </Grid>
      )}

      {data.length !== 0 && (
        <Grid
          container
          spacing={3}
          overflow={'auto'}
          maxHeight={'100vh'}
          width={'88vw'}
          justifyContent={'flex-start'}
          alignSelf={'center'}
          sx={{
            scrollbarWidth: 'none',
          }}
        >
          {data.map((favorite) =>
            favorite.type === 'entity' ? (
              <EntityFavoriteCard key={favorite.id} {...favorite} />
            ) : (
              <GroupFavoriteCard key={favorite.id} {...favorite} />
            ),
          )}
        </Grid>
      )}
    </Box>
    // </Box>
  );
};

export default Home;
