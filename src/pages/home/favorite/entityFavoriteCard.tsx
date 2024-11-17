import { Divider, Grid, useTheme } from '@mui/material';
import { ContactOptions } from '../../../common/contactOptions';
import { FavoriteButton } from '../../../common/buttons/favoriteButton';
import { ProfileImage } from '../../../common/profileImage';
import { Option } from '../../../common/contactMenu';
import { ContactNumbers } from '../../../common/contactNumbers';
import { SubTitle } from '../../../common/divs/subTitle';
import { Title } from '../../../common/divs/title';

export const EntityFavoriteCard = ({
  id,
  fullName,
  jobTitle,
  mails,
  chats,
  jabberPhone,
  redPhone,
  mobilePhone,
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
  jabberPhone: string;
  redPhone: string;
  mobilePhone: string;
  handleSelect: () => void;
  isSelected: boolean;
  sex: 'male' | 'female';
  hiddenFields: string[];
}) => {
  const theme = useTheme();

  return (
    <Grid item>
      <FavoriteButton
        id={id}
        type={'entity'}
        iconStyle={{
          right: '-30px',
          bottom: '-20px',
        }}
        imageStyle={{
          top: '20px',
        }}
      />
      <Grid
        container
        sx={{
          border: 1,
          borderColor: isSelected ? theme.colors.darkAqua : theme.colors.lighterGray,
          boxShadow: isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
          borderRadius: '1rem',
          flexDirection: 'column',
          minWidth: '17.5rem',
          width: '17.5rem',
          height: '15rem',
          minHeight: '15rem',
          padding: 2,
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
              id={id}
              style={{ width: '3.5rem', height: '3.5rem' }}
              sex={sex}
            />
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '70%',
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

          <Grid container>
            {(mails?.length || chats?.length || mobilePhone || jabberPhone) && (
              <Grid container sx={{ width: '100%', gap: 1 }}>
                <Divider
                  sx={{ width: '100%', backgroundColor: theme.colors.lighterGray, border: 'none', height: '1px' }}
                />
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', px: 0.1 }}>
                  <ContactNumbers mobilePhone={mobilePhone} hiddenFields={hiddenFields} />
                  <ContactOptions jabberPhone={jabberPhone} mails={mails} chats={chats} hiddenFields={hiddenFields} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
