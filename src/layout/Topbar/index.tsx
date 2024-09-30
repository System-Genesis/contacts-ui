import { Box, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProfileIcon from '../../assets/icons/profileExample.svg';
import Yesodot from '../../assets/icons/yesodot.svg';
import Sapir from '../../assets/icons/sapir.svg';

const Topbar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
          {/* //TODO: handle Edit entity */}
          <img src={ProfileIcon} />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ height: '30px', margin: 'auto', mr: theme.spacing(1) }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: theme.spacing(2) }}>
          <img src={Sapir} onClick={() => console.log('roei is GAY ... ')} />
          <img src={Yesodot} onClick={() => console.log('Tommy is GAY ... ')} />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
