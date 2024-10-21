import { Box, Grid, Typography } from '@mui/material';
import EmptyFavorites from '../../assets/icons/emptyFavorites.svg';
import { EntityFavoriteCard } from './Favorites/Favorite/EntityFavoriteCard';
import { useQuery } from '@tanstack/react-query';
import { getMyFavoritesRequest } from '../../services/favoriteService';
import { GroupFavoriteCard } from './Favorites/Favorite/GroupFavoriteCard';
import favStar from '../../assets/icons/favStar.svg';
import { ResultsTypes } from '../../lib/enums';

const Home = () => {
  const { data } = useQuery({ queryKey: ['myFavorites'], queryFn: getMyFavoritesRequest, initialData: [] });

  const generateFavorite = (favorite) => {
    switch (favorite.type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        return <EntityFavoriteCard key={favorite.id} {...favorite} />;

      case ResultsTypes.GROUP:
        return <GroupFavoriteCard key={favorite.id} {...favorite} />;
    }
  };

  return (
    <Box
      sx={{
        width: '83%',
        height: '50%',
        display: 'flex',
        marginTop: '3rem',
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
        <Grid display="flex" justifyContent="center" paddingY="80px">
          <img src={EmptyFavorites} />
        </Grid>
      )}

      {data.length !== 0 && (
        <Grid
          marginBottom={15}
          paddingBottom={2}
          container
          overflow={'auto'}
          maxHeight={'100vh'}
          width={'100%'}
          justifyContent={'flex-start'}
          rowGap={0}
          columnGap={1}
          sx={{
            height: '30rem',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.6rem',
            },
            '&::-webkit-scrollbar-track': {
              background: '#FFF', // Light gray background track
              borderRadius: '100px', // Rounded track to match iPhone look
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#bad1ca', // Dark Aqua for thumb
              borderRadius: '10px', // Fully rounded thumb
              border: '2px solid #F7F7F7', // Light gray padding around thumb for sleek look
              maxWidth: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#9aafa9', // Aqua on hover for slight interaction feedback
            },
          }}
        >
          {data.map(generateFavorite)}
        </Grid>
      )}
    </Box>
    // </Box>
  );
};

export default Home;
