import { Box, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Yesodot from '../../assets/icons/yesodot.svg';
import Sapir from '../../assets/icons/sapir.svg';
import { ProfileImage } from '../../common/ProfileImage';

const Topbar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '70px',
        color: theme.colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <img src={Sapir} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          columnGap: theme.spacing(3),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: theme.spacing(1.5),
          }}
        >
          <ProfileImage type="entity" id={currentUser.id} style={{ width: '2vw' }} />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ height: '30px', margin: 'auto', mr: theme.spacing(1) }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: theme.spacing(2) }}>
          <img src={Sapir} />
          <img src={Yesodot} />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
