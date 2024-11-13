import { Grid, Typography, useTheme } from '@mui/material';
import { Group } from '../../../../lib/types';
import { ProfileImage } from '../../../profileImage';
import openSub from '../../../../assets/icons/openSub.svg';
import { openSubGroup } from '../../../../store/reducers/drawer';
import { useDispatch } from 'react-redux';

export const GroupCard = ({ group }: { group: Group }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Grid
      item
      onClick={() => dispatch(openSubGroup(group))}
      sx={{
        borderBottom: `1px solid ${theme.colors.gray}`,
        p: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        cursor: 'pointer',
      }}
    >
      <Grid container sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Grid item xs={2} alignContent={'center'}>
          <ProfileImage type="group" id={group.id} style={{ width: '2.5rem', height: '2.5rem' }} onClick={() => ({})} />
        </Grid>
        <Typography> {group.name}</Typography>
        <Typography>{group.entitiesCount}</Typography>
      </Grid>

      <Grid item xs={2} alignContent={'center'} display={'flex'} justifyContent={'end'}>
        <Grid item>
          <img src={openSub} style={{ padding: 0 }} />
        </Grid>
      </Grid>
    </Grid>
  );
};
