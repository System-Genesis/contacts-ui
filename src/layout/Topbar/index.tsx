import { Box, Divider, useTheme, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import i18next from 'i18next';
import { useState } from 'react';
import { DrawerWrapper } from '../../common/drawer/drawerWrapper';
import { UserContent } from '../../common/drawer/content/user';
import { GroupContact } from '../../common/drawer/content/group';
import { useNavigate } from 'react-router-dom';
import Yesodot from '../../assets/icons/yesodot.svg';
import Sapir from '../../assets/icons/sapir.svg';
import icon from '../../assets/icons/icon.svg';
import { ProfileImage } from '../../common/ProfileImage';
import { setSearchTerm } from '../../store/reducers/search';

const TopBar = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        color: theme.colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={() => {
          navigate('/');
          dispatch(setSearchTerm(''));
        }}
        sx={{ p: 0, '&:hover': { background: 'none' } }}
      >
        <img src={icon} style={{ width: '5rem', alignSelf: 'center' }} />
      </IconButton>
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
          onClick={() => setIsProfileDrawerOpen(true)}
        />
      </Box>
      <DrawerWrapper
        isOpen={isProfileDrawerOpen}
        setIsOpen={setIsProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
      >
        {(props) => <GroupContact {...props} object={selectedObject} />}
      </DrawerWrapper>
    </Box>
  );
};

export default TopBar;
