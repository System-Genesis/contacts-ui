import { Grid, useTheme } from '@mui/material';
import { ContactTags } from '../../tag/contactTags';
import { ProfileImage } from '../../profileImage';
import { ContactOptions } from '../../contactOptions';
import { FavoriteButton } from '../../buttons/favoriteButton';
import { Title } from '../../divs/title';
import { SubTitle } from '../../divs/subTitle';

export const UpperContact: React.FC<{
  contact: any;
  isEdit: boolean;
  subTitle: string;
  title: string;
  imageSize?: string;
}> = ({ contact, isEdit, subTitle, title, imageSize = '5rem' }) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container>
        <Grid item sx={{ height: '5rem', display: 'flex', alignItems: 'flex-end' }}>
          <ProfileImage
            type={contact.type ?? 'entity'}
            id={contact.id}
            style={{ width: imageSize, height: imageSize }}
          />
        </Grid>

        <Grid container sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'nowrap' }}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 2,
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <FavoriteButton id={contact.id} type={contact.type ?? 'entity'} />

            <Title value={title} sx={{ fontWeight: 'bold', minWidth: 0, fontSize: 20 }} />
            <SubTitle
              value={subTitle}
              sx={{
                fontSize: 16,
                borderRadius: '30px',
                maxWidth: '200px',
              }}
            />
          </Grid>
          <ContactOptions mails={contact.mails} chats={contact.chats} jabberPhone={contact.jabberPhone} />
        </Grid>
        <Title value={contact.rank} sx={{ fontWeight: 'bold', minWidth: 0, fontSize: 12, ml: 4, mt: -0.5 }} />
        <Grid item>
          <ContactTags tags={contact.tags ?? []} isEdit={isEdit} />
        </Grid>
      </Grid>
    </Grid>
  );
};
