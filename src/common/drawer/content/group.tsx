import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import HierarchyIcon from '../../../assets/icons/new-hierarchy.svg';
import FavoritesIcon from '../../../assets/icons/favorites.svg';
import OutlookIcon from '../../../assets/icons/outlook.svg';
import JabberIcon from '../../../assets/icons/jabber.svg';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { CustomChip } from '../../divs/chip';

export const GroupContect: React.FC<{ isEdit: boolean; setIsEdit: boolean; object: any }> = ({
  isEdit,
  setIsEdit,
  object,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <IconButton sx={{ alignSelf: 'flex-start', backgroundColor: `${theme.colors.gray}` }}>
        <img src={HierarchyIcon} />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 1 }}>
          <IconButton sx={{}}>
            <img src={FavoritesIcon} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
            {object.name}
          </Typography>
          <CustomChip
            label={`${object.count} ${i18next.t('people')}`}
            style={{ backgroundColor: '#EDF7F4', color: '#295C54', marginTop: 6, fontSize: '16px' }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
            <IconButton>
              <img src={JabberIcon} />
            </IconButton>
            <IconButton>
              <img src={OutlookIcon} />
            </IconButton>
          </Box>
        </Box>
        <Box></Box>
      </Box>

      <Box>
        {object.tags.map((tag) => (
          <CustomChip
            label={tag.name}
            style={{ backgroundColor: '#EDF7F4', color: '#295C54', marginTop: 6, fontSize: '14px' }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('description')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="subtitle1" sx={{ fontSize: '12px', flex: 1 }}>
            {i18next.t('hierarchy')}
          </Typography>
          <Typography sx={{ fontSize: '13px', flex: 3 }}>{object.hierarchy}</Typography>
        </Box>
      </Box>

      <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('contactDetails')}</Typography>
        <FieldDiv field={i18next.t('redPhone')} value={object.jabberPhone} />
        <FieldDiv field={i18next.t('anotherPhone')} value={object.anotherPhone} />
        <FieldDiv field={i18next.t('mail')} value={object.mail} />
      </Box>

      <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />
    </Box>
  );
};
