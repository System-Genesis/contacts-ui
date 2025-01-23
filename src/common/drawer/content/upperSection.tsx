import { Grid } from '@mui/material';
import { ContactTags } from '../../tag/contactTags';
import { ProfileImage } from '../../profileImage';
import { ContactOptions } from '../../contactOptions';
import { FavoriteButton } from '../../buttons/favoriteButton';
import { Title } from '../../divs/title';
import { SubTitle } from '../../divs/subTitle';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDefaultTags } from '../../../utils/utils';

export const UpperContact: React.FC<{
  contact: any;
  setFormData?: any;
  subTitle: string;
  title: string;
  imageSize?: string;
  hiddenFields: string[];
  type: 'group' | 'goalUser' | 'entity';
  isPending?: boolean;
}> = ({ contact, subTitle, title, imageSize = '5rem', setFormData, hiddenFields, type, isPending = false }) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container>
        <Grid item sx={{ height: '4rem', display: 'flex', alignItems: 'flex-end' }}>
          <ProfileImage
            type={type}
            identifier={contact.personalNumber ?? contact.identityCard}
            style={{ width: imageSize, height: imageSize }}
            sex={contact.sex}
          />
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
            {contact.rank !== i18next.t('unknown') && <Title value={contact.rank} sx={{ minWidth: 0, fontSize: 15 }} />}
            <Title value={title} sx={{ fontWeight: 'bold', minWidth: 0, fontSize: 20, maxWidth: '100%' }} />
          </Grid>
          {currentUser.id !== contact.id && (
            <ContactOptions
              mails={contact.mails}
              chats={contact.chats}
              jabberPhones={contact.jabberPhones}
              hiddenFields={hiddenFields}
              location="drawer"
            />
          )}
        </Grid>

        <Grid container>
          <SubTitle
            value={subTitle}
            noToolTip
            sx={{
              fontSize: 16,
              borderRadius: '30px',
              ml: 3,
              maxWidth: '100%',
            }}
            isPending={isPending}
          />
        </Grid>
        <Grid container mt={1.5}>
          <ContactTags
            tags={contact.tags ?? []}
            isEdit={isEdit}
            setFormData={setFormData}
            defaultTags={type === 'entity' ? getDefaultTags(contact) : []}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
