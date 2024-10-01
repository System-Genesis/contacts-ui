import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ResultsTypes } from '../../../lib/enums';
import i18next from 'i18next';
import EntityIcon from '../../../assets/icons/entity.svg';
import HierarchyIcon from '../../../assets/icons/hierarchy.svg';
import GoalUserIcon from '../../../assets/icons/goal-user.svg';
import { useEffect, useState } from 'react';

export const resultsTypeToIcon = {
  [ResultsTypes.ENTITY]: EntityIcon,
  [ResultsTypes.GROUP]: HierarchyIcon,
  [ResultsTypes.GOAL_USER]: GoalUserIcon,
};

const ResultsMenuItem = ({
  type,
  icon,
  count,
  selected,
  setSelected,
}: {
  type: ResultsTypes;
  icon: string;
  count: number;
  selected: ResultsTypes;
  setSelected: (selected: ResultsTypes) => void;
}) => {
  const theme = useTheme();

  const handleSelect = () => {
    if (selected === type) return;

    setSelected(type);
  };

  return (
    <Box
      onClick={handleSelect}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        // width: '10vw',
        cursor: 'pointer',
        alignItems: 'center',
        paddingX: theme.spacing(1),
        ...(selected === type && {
          borderLeft: `3px solid ${theme.colors.darkAqua}`,
        }),
      }}
    >
      <Box sx={{ display: 'flex', columnGap: theme.spacing(1) }}>
        <img width={18} height={18} src={icon} />
        <Typography sx={{ fontSize: 14 }}>{i18next.t(`resultsType.${type}`)}</Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          borderRadius: 100,
          backgroundColor: theme.colors.lightAqua,
          padding: theme.spacing(0.5),
          width: '25px',
          height: '25px',
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

  useEffect(() => {
    setTotalResults(Object.values(counts).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
  }, [counts]);

  return (
    <Stack sx={{ rowGap: theme.spacing(1.5), paddingX: theme.spacing(3), marginTop: theme.spacing(3) }}>
      <Typography
        sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: theme.spacing(2) }}
      >{`נמצאו ${totalResults} תוצאות`}</Typography>
      {Object.values(ResultsTypes).map((type) => (
        <ResultsMenuItem
          type={type}
          icon={resultsTypeToIcon[type]}
          count={counts[type]}
          selected={resultsType}
          setSelected={setResultsType}
        />
      ))}
    </Stack>
  );
};
