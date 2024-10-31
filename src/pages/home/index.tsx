import { Box, Grid, Typography, useTheme } from '@mui/material';
import EmptyFavorites from '../../assets/icons/emptyFavorites.svg';
import { EntityFavoriteCard } from './Favorites/Favorite/EntityFavoriteCard';
import { useQuery } from '@tanstack/react-query';
import { getMyFavoritesRequest } from '../../services/favoriteService';
import { GroupFavoriteCard } from './Favorites/Favorite/GroupFavoriteCard';
import favStar from '../../assets/icons/favStar.svg';
import { ResultsTypes } from '../../lib/enums';
import { ContactDrawer } from '../../common/drawer/DrawerWrapper';
import { setDrawerObject, setIsDrawerOpen } from '../../store/reducers/drawer';
import { useDispatch } from 'react-redux';

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data } = useQuery({ queryKey: ['myFavorites'], queryFn: getMyFavoritesRequest, initialData: [] });

  const handleCardClick = (object: object) => {
    dispatch(setDrawerObject(object));
    dispatch(setIsDrawerOpen(true));
  };

  const generateFavorite = (favorite) => {
    switch (favorite.type) {
      case ResultsTypes.ENTITY:
      case ResultsTypes.GOAL_USER:
        return (
          <EntityFavoriteCard key={favorite.id} {...favorite} handleSelect={() => handleCardClick({ ...favorite })} />
        );

      case ResultsTypes.GROUP:
        return (
          <GroupFavoriteCard key={favorite.id} {...favorite} handleSelect={() => handleCardClick({ ...favorite })} />
        );
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
      <Box sx={{ display: 'flex', columnGap: 1, textAlign: 'center', mb: 1 }}>
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
              background: theme.colors.gray,
              borderRadius: '100px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.colors.aquaLight,
              borderRadius: '10px',
              border: `2px solid ${theme.colors.gray}`,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme.colors.aquaLightGray,
            },
          }}
        >
          {data.map(generateFavorite)}
        </Grid>
      )}
      <ContactDrawer />
    </Box>
  );
};

export default Home;
