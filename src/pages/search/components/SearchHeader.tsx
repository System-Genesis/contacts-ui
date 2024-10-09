import { Box, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import { resultsTypeToIcon } from './resultsMenu';

export const SearchHeader = ({ type, count }: { type: ResultsTypes; count: number }) => {
  const theme = useTheme();
  console.log('12314');
  return (
    <Box sx={{ display: 'flex', padding: theme.spacing(4), alignItems: 'center' }}>
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginRight: theme.spacing(1) }}>
        {`נמצאו ${count} תוצאות בסינון `}
      </Typography>
      <img width={18} height={18} src={resultsTypeToIcon[type]} />
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: theme.spacing(1) }}>
        {i18next.t(`resultsType.${type}`)}
      </Typography>
    </Box>
  );
};
export default SearchHeader;
