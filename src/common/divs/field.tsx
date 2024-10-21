import { Box, Typography } from '@mui/material';
import i18next from 'i18next';

export const FieldDiv = ({ field, value }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      <Typography sx={{ flex: '1', color: '#525252' }}>{field}</Typography>
      <Typography sx={{ flex: '3' }}>{value ?? i18next.t('noData')}</Typography>
    </Box>
  );
};
