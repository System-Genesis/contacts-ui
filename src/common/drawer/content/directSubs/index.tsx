import { Grid } from '@mui/material';
import { Entity, Group } from '../../../../lib/types';
import { GroupCard } from './group';
import { EntityCard } from './entity';

export const DirectSubs = ({ subs, type }: { subs: Group[] | Entity[]; type: 'group' | 'entity' }) => {
  return (
    <Grid
      container
      minHeight={type === 'group' ? '155px' : '225px'}
      maxHeight={'120px'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        gap: 0.5,
        marginLeft: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0',
        },
        '&': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
      }}
    >
      {subs.map((sub) =>
        type === 'group' ? <GroupCard key={sub.id} group={sub} /> : <EntityCard key={sub.id} entity={sub} />,
      )}
    </Grid>
  );
};
