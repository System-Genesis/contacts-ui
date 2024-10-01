import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import FavoritesIcon from '../../../assets/icons/favorites.svg';
import { CustomChip } from '../../divs/chip';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';

export const UserContent = ({ isEdit, setIsEdit, entity, picture }) => {
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: theme.spacing(3) }}>
      <img src={picture} alt="profile" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <IconButton>
            <img src={FavoritesIcon} />
          </IconButton>
          <Typography variant="body1">{entity.fullName}</Typography>
          {entity.jobTitle && (
            <CustomChip label={entity.jobTitle} style={{ backgroundColor: '#EDF7F4', color: '#295C54' }} />
          )}
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}></Box>
      </Box>
      {entity.tags?.map((tag, index) => (
        <CustomChip key={index} label={tag.name} style={{ backgroundColor: '#EDF7F4', color: '#295C54' }} />
      ))}

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1.5) }}>
        <Typography variant="body1">{i18next.t(`role`)}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1) }}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={entity.hierarchy} />
          <FieldDiv field={i18next.t('field.uniqueId')} value={entity.adfsId.split('@')[0]} />
          <FieldDiv field={i18next.t('field.mail')} value={entity.adfsId.split('@')[0]} />
        </Box>
      </Box>
    </Box>
  );
};
