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
import { GroupContect } from '../../common/drawer/content/group';

const Topbar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>({
    name: 'מדור דור',
    count: 30,
    tags: [{ id: 1, name: 'תגית' }],
    hierarchy: 'מערך ספיר/מטה/ענף יסודות/מדור דור',
    jabberPhone: '000000',
    mail: 't21398@gmail.com',
    entities: [
      {
        mobilePhone: '0525386123',
        jubberPhone: '9999',
        tags: ['תגית', 'developer', 'tommy', 'gay'],
        _id: '6616dc68315b2947b196514c',
        displayName: 'city_name/רכב/תעשייתי/כלים/Strategist - אורית שלח',
        entityType: 'Civilian',
        identityCard: '274941392',
        personalNumber: '9162538',
        serviceType: 'g',
        firstName: 'אורית',
        lastName: 'שלח',
        fullName: 'אורית שלח',
        akaUnit: 'צפון',
        dischargeDay: '2020-12-16T00:00:11.724Z',
        rank: 'rookie',
        mail: '',
        jobTitle: 'Strategist',
        phone: [],
        address: "איתמר, שדרות ג'ו עמר, 321",
        clearance: '4',
        fullClearance: '004',
        coloredClearance: 'white',
        sex: 'male',
        directGroup: '6616eb7126928782bb9a4b11',
        commanderOf: [],
        hierarchy: 'city_name/רכב/תעשייתי/כלים',
        akaUnitHierarchy: ['צוות', 'מדר', 'עף', 'matcal'],
        isAmanAssociated: false,
        createdAt: '2024-04-10T18:37:28.631Z',
        updatedAt: '2024-06-05T08:48:49.793Z',
        id: '6616dc68315b2947b196514c',
      },
    ],
  });

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
        {(props) => <GroupContect {...props} object={selectedObject} />}
      </DrawerWrapper>
    </Box>
  );
};

export default Topbar;
