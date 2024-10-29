import { Grid, Typography, useTheme } from '@mui/material';
import { ContactTags } from '../../tag/ContactTags';
import { ProfileImage } from '../../ProfileImage';
import { ContactOptions } from '../../ContactOptions';
import { FavoriteButton } from '../../buttons/FavoriteButton';

export const UpperContact: React.FC<{ object: any; isEdit: boolean; subTitle: string; title: string }> = ({
  object,
  isEdit,
  subTitle,
  title,
}) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <Grid container>
        <Grid item>
          <ProfileImage type={object.type ?? 'entity'} id={object.id} style={{ width: '5rem' }} />
        </Grid>

        <Grid container sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'nowrap' }}>
          <Grid container sx={{ display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center' }}>
            <FavoriteButton id={object.id} type={object.type ?? 'entity'} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography
              sx={{
                backgroundColor: theme.colors.lightAqua,
                color: theme.colors.green,
                fontSize: '16px',
                borderRadius: '30px',
                padding: '0.25rem 0.5rem',
              }}
            >
              {subTitle}
            </Typography>
          </Grid>
          <ContactOptions mails={object.mails} chats={object.chats} jabberPhone={object.jabberPhone} />
        </Grid>
        <Grid item>
          <ContactTags tags={object.tags ?? []} isEdit={isEdit} />
        </Grid>
      </Grid>
    </Grid>
  );
};
