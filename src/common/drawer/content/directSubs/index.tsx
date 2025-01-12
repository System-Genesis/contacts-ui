import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Entity, Group } from '../../../../lib/types';
import { GroupCard } from './group';
import { EntityCard } from './entity';
import { styledScrollY } from './../../../../css/common';
import Lottie from 'react-lottie';
import animationData from '../../../../assets/lottie/circleLoading.json';
import { StyledDivider, StyledGridInfo } from '../divider';

export const DirectSubs = ({
  subs,
  type,
  isPending,
  header,
}: {
  subs: Group[] | Entity[];
  type: 'group' | 'entity';
  isPending: boolean;
  header: string;
}) => {
  const theme = useTheme();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  if (isPending)
    return (
      <Box>
        <Typography variant="body1">{header}</Typography>
        <Lottie options={defaultOptions} height={150} width={150} />
      </Box>
    );

  if (!subs.length) return <></>;
  return (
    <StyledGridInfo>
      <Typography variant="body1">{header}</Typography>

      <Grid
        container
        minHeight={type === 'group' ? '140px' : '210px'}
        maxHeight={'120px'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          gap: 1,
          px: 1,
          marginLeft: 1,
          ...styledScrollY(theme),
        }}
      >
        {subs.map((sub) =>
          type === 'group' ? <GroupCard key={sub.id} group={sub} /> : <EntityCard key={sub.id} entity={sub} />,
        )}
      </Grid>
      <StyledDivider theme={theme} />
    </StyledGridInfo>
  );
};
