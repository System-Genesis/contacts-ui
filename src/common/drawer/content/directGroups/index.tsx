import { Grid } from '@mui/material';
import { GroupCard } from './card';
import { GroupSearchResult } from '../../../../lib/types';

export const DirectGroups = ({ groups }: { groups: GroupSearchResult[] }) => {
  return (
    <Grid
      container
      minHeight={'120px'}
      maxHeight={'120px'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        gap: 1,
        px: 1,
        marginLeft: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0', // Hide scrollbar by setting width to 0
        },
        '&': {
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
        },
      }}
    >
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </Grid>
  );
};
