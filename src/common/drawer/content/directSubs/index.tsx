import { Grid, useTheme } from '@mui/material';
import { Entity, Group } from '../../../../lib/types';
import { GroupCard } from './group';
import { EntityCard } from './entity';
import { styledScrollY } from './../../../../css/common';

export const DirectSubs = ({ subs, type }: { subs: Group[] | Entity[]; type: 'group' | 'entity' }) => {
  const theme = useTheme();
  return (
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
  );
};
