import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FavoritesIcon from '../../../assets/icons/favorites.svg';
import ProfileIcon from '../../../assets/icons/profileExample.svg';

import { CustomChip } from '../../divs/chip';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';

export const UserContent = ({ isEdit, setIsEdit, entity, picture }) => {
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  const pic = picture ? picture : ProfileIcon;

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: theme.spacing(3) }}>
      <img src={pic} alt="profile" style={{ width: '4vw', height: 'auto', borderRadius: '50%' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: theme.spacing(1) }}>
          <IconButton>
            <img src={FavoritesIcon} />
          </IconButton>
          <Typography variant="body1">{user.fullName}</Typography>
          {user.jobTitle && (
            <CustomChip label={user.jobTitle} style={{ backgroundColor: '#EDF7F4', color: '#295C54' }} />
          )}
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}></Box>
      </Box>
      {user.tags?.map((tag, index) => (
        <CustomChip key={index} label={tag.name} style={{ backgroundColor: '#EDF7F4', color: '#295C54' }} />
      ))}

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1.5) }}>
        <Typography variant="body1">{i18next.t(`role`)}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1) }}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={user.hierarchy} />
          <FieldDiv field={i18next.t('field.uniqueId')} value={user.adfsId?.split('@')[0]} />
          <FieldDiv field={i18next.t('field.mail')} value={user.mail?.split('@')[0]} />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1.5) }}>
        <Typography variant="body1">{i18next.t(`personalDetails`)}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1) }}>
          <FieldDiv field={i18next.t('field.mobilePhone')} value={user.mobilePhone?.toString()} />
          <FieldDiv field={i18next.t('field.birthDate')} value={user.birthDate?.toString()} />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1.5) }}>
        <Typography variant="body1">{i18next.t(`militaryDetails`)}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1) }}>
          <FieldDiv field={i18next.t('field.personalNumber')} value={user.personalNumber} />
          <FieldDiv field={i18next.t('field.identityCard')} value={user.identityCard} />
          <FieldDiv field={i18next.t('field.rank')} value={user.rank} />
          <FieldDiv field={i18next.t('field.redPhone')} value={user.redPhone?.toString()} />
        </Box>
      </Box>
      {isEdit && (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsEdit(false)}>{i18next.t(`cancel`)}</Button>
          <Button>{i18next.t(`save`)}</Button>
        </Box>
      )}
    </Box>
  );
};
