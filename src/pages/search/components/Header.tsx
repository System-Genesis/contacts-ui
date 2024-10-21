import { Box, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';

import EntityIcon from '../../../assets/icons/greenEntity.svg';
import HierarchyIcon from '../../../assets/icons/greenHierarchy.svg';
import GoalUserIcon from '../../../assets/icons/green-goal-user.svg';

const resultsTypeToIcon = {
  [ResultsTypes.ENTITY]: EntityIcon,
  [ResultsTypes.GROUP]: HierarchyIcon,
  [ResultsTypes.GOAL_USER]: GoalUserIcon,
};

export const HistoryHeader = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginRight: theme.spacing(1), color: '#223F3B' }}>
        {i18next.t('historyHeader')}
      </Typography>
    </Box>
  );
};

export const SearchHeader = ({ type, count }: { type: ResultsTypes; count: number }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginRight: theme.spacing(1), color: '#223F3B' }}>
        {`נמצאו ${count} תוצאות בסינון `}
      </Typography>
      <img width={18} height={18} src={resultsTypeToIcon[type]} color={'#223F3B'} />
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginLeft: theme.spacing(1), color: '#223F3B' }}>
        {i18next.t(`resultsType.${type}`)}
      </Typography>
    </Box>
  );
};
