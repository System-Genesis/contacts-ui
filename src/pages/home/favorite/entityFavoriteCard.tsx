import { Divider, Grid, useTheme } from '@mui/material';
import { ContactOptions } from '../../../common/contactOptions';
import { FavoriteButton } from '../../../common/buttons/favoriteButton';
import { ProfileImage } from '../../../common/profileImage';
import { ContactNumbers } from '../../../common/contactNumbers';
import { SubTitle } from '../../../common/divs/subTitle';
import { Title } from '../../../common/divs/title';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Option } from '../../../lib/types';

export const EntityFavoriteCard = ({
  id,
  fullName,
  jobTitle,
  mails,
  chats,
  jabberPhones,
  mobilePhone,
  identityCard,
  personalNumber,
  entityType,
  handleSelect,
  isSelected,
  sex,
  hiddenFields,
}: {
  id: string;
  fullName: string;
  entityType: string;
  jobTitle: string;
  mails: Option[];
  chats: Option[];
  jabberPhones: Option[];
  redPhone: string;
  mobilePhone: string;
  identityCard: string;
  personalNumber: string;
  handleSelect: () => void;
  isSelected: boolean;
  sex: 'זכר' | 'נקבה';
  hiddenFields: string[];
  source: string;
}) => {
  const theme = useTheme();
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <Grid item>
      <FavoriteButton
        id={id}
        type={'entity'}
        imageStyle={{ top: '20px', }}
        iconStyle={{
          right: '-30px',
          bottom: '-20px',
        }}
      />
      <Grid
        container
        sx={{
          border: 1,
          borderColor: isSelected ? theme.colors.darkAqua : theme.colors.lighterGray,
          borderRadius: '1rem',
          flexDirection: 'column',
          minWidth: '17.5rem',
          width: '17.5rem',
          height: '15rem',
          minHeight: '15rem',
          paddingX: 2,
          paddingTop: 2,
          paddingBottom: 1,
          margin: '0.25rem 0.5rem',
        }}
      >
        <Grid
          container
          sx={{
            mt: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            container
            onClick={handleSelect}
            sx={{ height: '70%', justifyContent: 'center', gap: 1.5, cursor: 'pointer' }}
          >
            <ProfileImage
              type={entityType === 'GoalUser' ? 'goalUser' : 'entity'}
              identifier={identityCard ?? personalNumber}
              style={{ width: '3.5rem', height: '3.5rem' }}
              sex={sex}
            />
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '58%',
              }}
            >
              <Grid
                container
                sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: 1, alignItems: 'center' }}
              >
                <Title value={fullName} />
                <SubTitle value={jobTitle} sx={{ maxWidth: '210px' }} noToolTip />
              </Grid>
            </Grid>
          </Grid>

          {(mails?.length > 0 || chats?.length > 0 || mobilePhone || jabberPhones.length > 0) && (
            <Grid container sx={{ width: '100%', gap: 1, height: '3rem', justifyContent: 'center' }}>
              <Divider
                sx={{ width: '100%', backgroundColor: theme.colors.lighterGray, border: 'none', height: '1px' }}
              />
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between', px: 0.1 }}>
                <ContactNumbers mobilePhone={mobilePhone} hiddenFields={hiddenFields} />
                <ContactOptions
                  jabberPhones={currentUser.id !== id ? jabberPhones : [] as Option[]}
                  mails={currentUser.id !== id ? mails : [] as Option[]}
                  chats={currentUser.id !== id ? chats : [] as Option[]}
                  hiddenFields={currentUser.id !== id ? hiddenFields : []}
                  location="favorite"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
