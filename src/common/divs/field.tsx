import { Box, Typography } from '@mui/material';
import i18next from 'i18next';

export const FieldDiv = ({ field, value }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      <Typography sx={{ flex: '1', color: '#525252' }}>{field}</Typography>
<<<<<<< HEAD
      <Typography sx={{ flex: '3' }}>{value ?? i18next.t(`noData`)}</Typography>
=======
      <Typography sx={{ flex: '3' }}>{value ?? i18next.t('noData')}</Typography>
>>>>>>> 426a79b8bbbccfdee1b2f6ab883bfb40d8e9108d
    </Box>
  );
};
