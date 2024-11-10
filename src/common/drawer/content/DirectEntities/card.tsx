import { Grid, Typography, useTheme } from '@mui/material';
import { Entity } from '../../../../lib/types';
import { ProfileImage } from '../../../ProfileImage';
import openSub from '../../../../assets/icons/openSub.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { ContactTags } from '../../../tag/ContactTags';
import { openSubEntity } from '../../../../store/reducers/drawer';

export const EntityCard = ({ entity }: { entity: Entity }) => {
  const theme = useTheme();
  const contact = useSelector((state: RootState) => state.drawer.contact);

  const dispatch = useDispatch();

  return (
    <Grid
      item
      onClick={() => dispatch(openSubEntity(entity))}
      sx={{
        borderBottom: `1px solid ${theme.colors.gray}`,
        p: 1,
        width: '100%',
        borderRadius: 4,
        ['&:hover']: {
          backgroundColor: theme.colors.lightAqua,
          transition: 'background-color  0.8s',
          cursor: 'pointer',
        },
      }}
    >
      <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Grid item xs={2} alignContent={'center'}>
          <ProfileImage
            id={entity.id}
            type={entity.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
            style={{ width: '2.5rem', height: '2.5rem' }}
            onClick={() => ({})}
          />
        </Grid>
        <Grid item xs={7} sx={{ alignContent: 'center' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', gap: 0.2 }}>
            <Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography fontSize={14}>{entity.fullName}</Typography>
              {entity.jobTitle && (
                <Typography
                  sx={{
                    backgroundColor: theme.colors.lightAqua,
                    color: theme.colors.green,
                    fontSize: 14,
                    borderRadius: 1.5,
                    padding: '0.1rem 0.4rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: '50px',
                    maxWidth: '180px',
                    m: 0,
                  }}
                >
                  {entity.jobTitle}
                </Typography>
              )}
            </Grid>

            {entity.commanderOf?.includes(contact?.id) && (
              <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography fontSize={12} color={theme.colors.darkGray}>
                  מפקד היררכיה
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={3} sx={{ gap: 1 }} alignContent={'center'}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item alignContent={'center'}>
              <ContactTags tags={contact?.tags ?? []} />
            </Grid>
            <Grid item>
              <img src={openSub} style={{ padding: 0 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
