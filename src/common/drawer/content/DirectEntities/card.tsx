import { Grid, useTheme } from '@mui/material';
import { Entity } from '../../../../lib/kartoffel.types';

export const EntityCard = ({ entity }: { entity: Entity }) => {
  const theme = useTheme();
  return (
    <Grid item sx={{ borderBottom: `1px solid ${theme.colors.gray}`, p: 1, width: '100%' }}>
      <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Grid item xs={2} alignContent={'center'}>
          picture
        </Grid>
        <Grid container xs={7} sx={{ gap: 1 }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Grid item>{entity.fullName}</Grid>
            <Grid item>{entity.jobTitle}</Grid>

            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>מפקד היררכיה</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={2} sx={{ gap: 1 }} alignContent={'center'}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>tags</Grid>
            <Grid item>click</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
