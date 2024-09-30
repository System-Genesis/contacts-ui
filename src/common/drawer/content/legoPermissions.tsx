import { Box, useTheme } from '@mui/material';
import i18next from 'i18next';
import EditIcon from '../../../assets/icons/edit.svg';
import PlusIcon from '../../../assets/icons/plus.svg';
import { LegoPermissionsSwipeCard } from '../../../pages/profile/card/swipeCard/legoPermissions';
import { CustomButton } from '../../buttons/CustomButton';

export const LegoPermissionsContent: React.FC<{
  permissionsList: { permission: string; hierarchies?: string[] }[];
}> = ({ permissionsList }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(2) }}>
        {permissionsList.map((perm, index) => (
          <LegoPermissionsSwipeCard key={index} permission={perm.permission} hierarchies={perm.hierarchies!} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '3.6vh' }}>
        <CustomButton
          variant="outlined"
          onClick={() => console.log('roei is gay')}
          icon={EditIcon}
          text={i18next.t(`profile.legoPermissions.edit`)}
          iconPosition="right"
          buttonStyles={{ color: theme.colors.orange, borderColor: theme.colors.orange, padding: theme.spacing(2) }}
          textStyles={{ color: theme.colors.orange }}
        />
        <CustomButton
          icon={PlusIcon}
          text={i18next.t(`profile.legoPermissions.requestPermissions`)}
          variant="contained"
          iconPosition="right"
          onClick={() => console.log('roei is super extra gay')}
          buttonStyles={{
            color: theme.colors.white,
            borderColor: theme.colors.orange,
            backgroundColor: theme.colors.orange,
            padding: theme.spacing(1),
          }}
          textStyles={{ color: theme.colors.white }}
        />
      </Box>
    </Box>
  );
};
