import { Grid } from '@mui/material';
import { Entity } from '../../../../lib/types';
import { EntityCard } from './card';

export const DirectEntities = ({ entities }: { entities: Entity[] }) => {
  return (
    <Grid
      container
      minHeight={'250px'}
      maxHeight={'250px'}
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
      {entities.map((entity) => (
        <EntityCard entity={entity} />
      ))}
    </Grid>
  );
};
