import { Box, Grid, Typography } from '@mui/material';
import EmptyFavorites from '../../assets/icons/emptyFavorites.svg';
import { EntityFavoriteCard } from './Favorites/Favorite/EntityFavoriteCard';
import { useQuery } from '@tanstack/react-query';
import { getMyFavoritesRequest } from '../../services/my';
import { GroupFavoriteCard } from './Favorites/Favorite/GroupFavoriteCard';
import favStar from '../../assets/icons/favStar.svg';

const Home = () => {
  const { data } = useQuery({ queryKey: ['myFavorites'], queryFn: getMyFavoritesRequest, initialData: [] });

  return (
    <Box
      sx={{
        width: '73%',
        height: '100%',
        display: 'flex',
        marginTop: '4rem',
        alignSelf: 'center',
        flexDirection: 'column',
        maxHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', columnGap: 1, textAlign: 'center' }}>
        <img src={favStar} style={{ width: 21 }} />
        <Typography fontSize={16}>מועדפים</Typography>
      </Box>

      {data.length === 0 && (
        <Grid display={'flex'} marginTop={15} justifyContent={'center'} paddingY={'80px'}>
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
