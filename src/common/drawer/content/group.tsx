import { Grid, Divider, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { CustomChip } from '../../divs/chip';
import { ContactTags } from '../../tag/ContactTags';
import { ProfileImage } from '../../ProfileImage';
import { ContactOptions } from '../../ContactOptions';
import { FavoriteButton } from '../../buttons/FavoriteButton';

export const GroupContact: React.FC<{ isEdit: boolean; setIsEdit: boolean; object: any }> = ({
  isEdit,
  setIsEdit,
  object,
}) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <Grid container>
        <Grid item>
          <ProfileImage type={object.type} id={object.id} style={{ width: '5rem' }} />
        </Grid>

        <Grid container sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'nowrap' }}>
          <FavoriteButton id={object.id} type={object.type} />
          <Grid container sx={{ display: 'flex', flexDirection: 'row', columnGap: 1, alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {object.name}
            </Typography>
            <CustomChip
              label={`${object.count} ${i18next.t('people')}`}
              style={{ backgroundColor: theme.colors.lightAqua, color: theme.colors.green, fontSize: '16px' }}
            />
          </Grid>
          <ContactOptions mails={object.mails} chats={object.chats} jabberPhone={object.jabberPhone} />
        </Grid>
        <ContactTags tags={object.tags} isEdit={isEdit} />
      </Grid>

      <Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('description')}</Typography>
          <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '12px', flex: 1 }}>
              {i18next.t('hierarchy')}
            </Typography>
            <Typography sx={{ fontSize: '13px', flex: 3 }}>{object.hierarchy}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />

        <Grid sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <Typography sx={{ columnGap: 5, fontSize: '14px' }}>{i18next.t('contactDetails')}</Typography>
          <FieldDiv field={i18next.t('redPhone')} value={object.jabberPhone} />
          <FieldDiv field={i18next.t('anotherPhone')} value={object.anotherPhone} />
          <FieldDiv field={i18next.t('mail')} value={object.mail} />
        </Grid>

        <Divider sx={{ border: `1px solid ${theme.colors.gray}` }} />
      </Grid>
    </Grid>
  );
};
