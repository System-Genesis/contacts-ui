import { Grid } from '@mui/material';
import { ContactTags } from '../../tag/contactTags';
import { ProfileImage } from '../../profileImage';
import { ContactOptions } from '../../contactOptions';
import { FavoriteButton } from '../../buttons/favoriteButton';
import { Title } from '../../divs/title';
import { SubTitle } from '../../divs/subTitle';

export const UpperContact: React.FC<{
  contact: any;
  isEdit: boolean;
  setFormData?: any;
  subTitle: string | undefined;
  title: string;
  imageSize?: string;
  hiddenFields: string[];
  type: 'group' | 'goalUser' | 'entity';
}> = ({ contact, isEdit, subTitle, title, imageSize = '5rem', setFormData, hiddenFields, type }) => {
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
      <Grid container>
        <Grid item sx={{ height: '4rem', display: 'flex', alignItems: 'flex-end' }}>
          <ProfileImage type={type} id={contact.id} style={{ width: imageSize, height: imageSize }} sex={contact.sex} />
        </Grid>

        <Grid container sx={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'nowrap' }}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 1.5,
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <FavoriteButton id={contact.id} type={contact.type} />
            <Title value={contact.rank} sx={{ minWidth: 0, fontSize: 15 }} />
            <Title value={title} sx={{ fontWeight: 'bold', minWidth: 0, fontSize: 20 }} />
          </Grid>
          <ContactOptions
            mails={contact.mails}
            chats={contact.chats}
            jabberPhone={contact.jabberPhone}
            hiddenFields={hiddenFields}
          />
        </Grid>

        <Grid container>
          <SubTitle
            value={subTitle}
            noToolTip
            sx={{
              fontSize: 16,
              borderRadius: '30px',
              maxWidth: 'none',
              ml: 3,
            }}
          />
        </Grid>
        <Grid container mt={2}>
          <ContactTags tags={contact.tags ?? []} isEdit={isEdit} setFormData={setFormData} />
        </Grid>
      </Grid>
    </Grid>
  );
};
