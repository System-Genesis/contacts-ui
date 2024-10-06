import { Box, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Yesodot from '../../assets/icons/yesodot.svg';
import Sapir from '../../assets/icons/sapir.svg';
import { ProfileImage } from '../../common/ProfileImage';

const TopBar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '70px !important',
        color: theme.colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 1.5rem  0 1.5rem',
      }}
    >
      <img src={Sapir} style={{ width: '2.5rem', alignSelf: 'center' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: theme.spacing(3),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: theme.spacing(1.8) }}>
          <img src={Sapir} style={{ height: '2rem', alignSelf: 'center' }} />
          <img src={Yesodot} style={{ height: '2rem', alignSelf: 'center' }} />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ height: '2.5rem' }} />

        <ProfileImage
          type={currentUser.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
          id={currentUser.id}
          style={{ width: '2.5rem' }}
        />
      </Box>
    </Box>
  );
};

export default TopBar;
