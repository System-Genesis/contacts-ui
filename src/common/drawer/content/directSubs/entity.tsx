import { Grid, Typography, useTheme } from '@mui/material';
import { EntitySearchResult } from '../../../../lib/types';
import { ProfileImage } from '../../../profileImage';
import openSub from '../../../../assets/icons/openSub.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { ContactTags } from '../../../tag/contactTags';
import { openSubEntity } from '../../../../store/reducers/drawer';
import { SubTitle } from '../../../divs/subTitle';
import { Title } from '../../../divs/title';
import { getDefaultTags } from '../../../../utils/utils';

export const EntityCard = ({ entity }: { entity: EntitySearchResult }) => {
  const theme = useTheme();
  const contact = useSelector((state: RootState) => state.drawer.contact!);

  const dispatch = useDispatch();

  return (
    <Grid
      item
      onClick={() => dispatch(openSubEntity(entity))}
      sx={{
        borderBottom: `1px solid ${theme.colors.gray}`,
        p: 1,
        width: '100%',
        alignItems: 'center',
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
            identifier={entity.personalNumber ?? entity.identityCard}
            type={entity.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
            style={{ width: '2.5rem', height: '2.5rem' }}
            sex={contact.sex}
          />
        </Grid>
        <Grid item xs={6} sx={{ alignContent: 'center', alignSelf: 'center' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', gap: 0.2 }}>
            <Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Title value={entity.fullName} sx={{ maxWidth: '110px' }} />
              <SubTitle value={entity.jobTitle} sx={{ maxWidth: '80px' }} noToolTip />
            </Grid>

            {Object.values(entity?.commanderOf)?.includes(contact.id) && (
              <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography fontSize={12} color={theme.colors.darkGray}>
                  מפקד היררכיה
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          xs={4}
          alignContent={'center'}
          sx={{
            gap: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <ContactTags tags={entity?.tags} shrunkSize={1} defaultTags={getDefaultTags(entity)} />
          </Grid>
          <Grid item display={'flex'} alignItems={'center'}>
            <img src={openSub} style={{ padding: 0 }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
