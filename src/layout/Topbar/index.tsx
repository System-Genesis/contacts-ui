import { Badge, BadgeProps, Box, Divider, IconButton, styled, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import i18next from 'i18next';
import ProfileIcon from '../../assets/icons/profileExample.svg';
import BellIcon from '../../assets/icons/bell.svg';
import QuestionMarkIcon from '../../assets/icons/question-mark.svg';
import { useState } from 'react';
import { DrawerWrapper } from '../../common/drawer/drawerWrapper';
import { UserContent } from '../../common/drawer/content/user';

const Topbar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      right: theme.spacing(2.6),
      top: theme.spacing(0.25),
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.white}`,
      color: theme.colors.white,
      fontSize: theme.typography.fontSize,
    },
  }));

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: theme.spacing(1.5),
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="span">
            {i18next.t('hello')}
          </Typography>
          <Typography variant="h6" component="span">
            {` ${currentUser.rank === 'לא ידוע' ? '' : currentUser.rank} ${currentUser.firstName} ${currentUser.lastName}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: theme.spacing(1) }}>
        <Divider orientation="vertical" flexItem sx={{ height: '20px', margin: 'auto', mr: theme.spacing(1) }} />
        <IconButton>
          <img src={QuestionMarkIcon} />
        </IconButton>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={2}>
            <img src={BellIcon} />
          </StyledBadge>
        </IconButton>
        <IconButton onClick={() => setIsProfileDrawerOpen(true)}>
          <img src={ProfileIcon} />
        </IconButton>
      </Box>
      <DrawerWrapper
        isOpen={isProfileDrawerOpen}
        setIsOpen={setIsProfileDrawerOpen}
        width="30vw"
        onClose={() => setIsProfileDrawerOpen(false)}
      >
        {(props) => <UserContent {...props} />}
      </DrawerWrapper>
    </Box>
  );
};

export default Topbar;
