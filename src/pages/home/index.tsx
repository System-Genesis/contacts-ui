import { Box, useTheme } from '@mui/material';
// import { RootState } from '../../store';
// import { useSelector } from 'react-redux';
// import SimpleUserHome from './simpleUser';
// import ApproverHome from './approver';

const Home = () => {
  const theme = useTheme();
  // const currentUser = useSelector((state: RootState) => state.user);
  // TODO: what permissions to show ApproverHome?

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: theme.spacing(5),
        rowGap: theme.spacing(5),
        paddingX: theme.spacing(2),
      }}
    >
      {/* {currentUser.permissions.length ? <ApproverHome /> : <SimpleUserHome />} */}
      <></>
    </Box>
  );
};

export default Home;
