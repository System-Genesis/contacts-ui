import { Box, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';

export const FieldDiv = ({ field, value }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      <Typography sx={{ flex: '1', color: theme.colors.darkGray, fontSize: 12 }}>{field}</Typography>
      <Typography sx={{ flex: '3', fontSize: 12 }}>{value ?? i18next.t('noData')}</Typography>
    </Box>
  );
};
