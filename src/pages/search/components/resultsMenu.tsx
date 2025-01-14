import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import EntityIcon from '../../../assets/icons/entity.svg';
import HierarchyIcon from '../../../assets/icons/hierarchy.svg';
import GoalUserIcon from '../../../assets/icons/goal-user.svg';
import TagIcon from '../../../assets/icons/tag.svg';
import { searchFilterApplied } from '../../../matomo/actions';
import { SelectedSign } from './selectedSign';

const resultsTypeToIcon = {
  [ResultsTypes.ENTITY]: EntityIcon,
  [ResultsTypes.GROUP]: HierarchyIcon,
  [ResultsTypes.GOAL_USER]: GoalUserIcon,
  [ResultsTypes.TAG]: TagIcon,
};

const ResultsMenuItem = ({
  type,
  count,
  selected,
  setSelected,
}: {
  type: ResultsTypes;
  count: number;
  selected: ResultsTypes;
  setSelected: (selected: ResultsTypes) => void;
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', wrap: 'nowrap', overflow: 'hidden' }}>
      <SelectedSign isSelected={selected === type} theme={theme} sx={{ height: '25px', marginLeft: 0.2 }} />
      <Box
        onClick={() => {
          selected !== type && setSelected(type);
          searchFilterApplied(type);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          alignItems: 'center',
          paddingX: theme.spacing(1),
          width: '100%',
          wrap: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: theme.spacing(1), alignItems: 'center' }}>
          <img width={18} height={18} src={resultsTypeToIcon[type]} />
          <Typography sx={{ fontSize: 14, lineHeight: 2 }}>{i18next.t(`resultsType.${type}`)}</Typography>
        </Box>
        <Typography
          sx={{
            display: 'inline-block',
            lineHeight: 2,
            fontSize: 13,
            borderRadius: '50%',
            backgroundColor: theme.colors.lightAqua,
            padding: theme.spacing(0.5),
            width: '33px',
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 500,
          }}
        >
          {count > 100 ? '99+' : count}
        </Typography>
      </Box>
    </Box>
  );
};

export const ResultsMenu = ({
  resultsType,
  setResultsType,
  counts,
}: {
  resultsType: ResultsTypes;
  setResultsType: (resultsType: ResultsTypes) => void;
  counts: Record<ResultsTypes, number>;
}) => {
  const theme = useTheme();
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => setTotalResults(Object.values(counts).reduce((sum, curr) => sum + curr, 0)), [counts]);

  return (
    <Stack
      sx={{
        rowGap: theme.spacing(1.5),
        paddingRight: theme.spacing(4),
        marginTop: theme.spacing(3),
      }}
    >
      <Typography
        sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: theme.spacing(2) }}
      >{`נמצאו ${totalResults.toLocaleString()} תוצאות`}</Typography>
      {Object.values(ResultsTypes).map((type) => (
        <ResultsMenuItem
          key={type}
          type={type}
          count={counts[type]}
          selected={resultsType ?? ResultsTypes.ENTITY}
          setSelected={setResultsType}
        />
      ))}
    </Stack>
  );
};
