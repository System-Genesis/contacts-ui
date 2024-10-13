import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import EntityIcon from '../../../assets/icons/entity.svg';
import HierarchyIcon from '../../../assets/icons/hierarchy.svg';
import GoalUserIcon from '../../../assets/icons/goal-user.svg';

const resultsTypeToIcon = {
  [ResultsTypes.ENTITY]: EntityIcon,
  [ResultsTypes.GROUP]: HierarchyIcon,
  [ResultsTypes.GOAL_USER]: GoalUserIcon,
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
    <Box
      onClick={() => selected !== type && setSelected(type)}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        alignItems: 'center',
        paddingX: theme.spacing(1),
        ...(selected === type && {
          borderLeft: `3px solid ${theme.colors.darkAqua}`,
        }),
      }}
    >
      <Box sx={{ display: 'flex', columnGap: theme.spacing(1) }}>
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
          width: '14%',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {count}
      </Typography>
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
    <Stack sx={{ rowGap: theme.spacing(1.5), paddingRight: theme.spacing(4), marginTop: theme.spacing(3) }}>
      <Typography
        sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: theme.spacing(2) }}
      >{`נמצאו ${totalResults} תוצאות`}</Typography>
      {Object.values(ResultsTypes).map((type) => (
        <ResultsMenuItem
          key={type}
          type={type}
          count={counts[type]}
          selected={resultsType}
          setSelected={setResultsType}
        />
      ))}
    </Stack>
  );
};
