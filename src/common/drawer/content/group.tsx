import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import HierarchyIcon from '../../../assets/icons/new-hierarchy.svg';
import FavoritesIcon from '../../../assets/icons/favorites.svg';
import OutlookIcon from '../../../assets/icons/outlook.svg';
import JabberIcon from '../../../assets/icons/jabber.svg';
import i18next from 'i18next';

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
          <IconButton>
            <img src={FavoritesIcon} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
            {object.name}
          </Typography>
          <Box sx={{ mt: 1.5 }}>{object.count}</Box>

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

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('description')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
          <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
            {i18next.t('hierarchy')}
          </Typography>
          <Typography sx={{ fontSize: '13px' }}>{object.hierarchy}</Typography>
        </Box>
      </Box>

      <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('contactDetails')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 9 }}>
          <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
            {i18next.t('redPhone')}
          </Typography>
          <Typography sx={{ fontSize: '13px' }}>{object.jabberPhone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
          <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
            {i18next.t('anotherPhone')}
          </Typography>
          <Typography sx={{ fontSize: '13px' }}>{object.anotherPhone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 12 }}>
          <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>
            {i18next.t('mail')}
          </Typography>
          <Typography sx={{ fontSize: '13px' }}>{object.mail}</Typography>
        </Box>
      </Box>

      <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />
    </Box>
  );
};
