import { Divider, Grid, useTheme } from '@mui/material';

import { ContactOptions } from '../../../common/contactOptions';
import { FavoriteButton } from '../../../common/buttons/favoriteButton';
import { ProfileImage } from '../../../common/profileImage';
import { Option } from '../../../common/contactMenu';
import { ContactNumbers } from '../../../common/contactNumbers';
import { Title } from '../../../common/divs/title';

export const GroupFavoriteCard = ({
  id,
  name,
  mails,
  chats,
  jabberPhone,
  redPhone,
  mobilePhone,
  handleSelect,
  isSelected,
  hiddenFields,
}: {
  id: string;
  name: string;
  mails: Option[];
  chats: Option[];
  jabberPhone: string;
  redPhone: string;
  mobilePhone: string;
  handleSelect: () => void;
  isSelected: boolean;
  hiddenFields: string[];
}) => {
  const theme = useTheme();
  return (
    <Grid item>
      <FavoriteButton
        id={id}
        type={'entity'}
        imageStyle={{
          top: '20px',
        }}
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
            <ProfileImage type="group" id={id} style={{ width: '3.5rem', height: '3.5rem' }} />
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
                <Title value={name} />
              </Grid>
            </Grid>
          </Grid>

          {(mails?.length || chats?.length || redPhone || jabberPhone) && (
            <Grid container sx={{ width: '100%', gap: 1 }}>
              <Divider
                sx={{ width: '100%', backgroundColor: theme.colors.lighterGray, border: 'none', height: '1px' }}
              />
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between', px: 0.1 }}>
                <ContactNumbers redPhone={redPhone} mobilePhone={mobilePhone} hiddenFields={hiddenFields} />
                <ContactOptions
                  jabberPhone={[{ option: jabberPhone }]}
                  mails={mails}
                  chats={chats}
                  hiddenFields={hiddenFields}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
