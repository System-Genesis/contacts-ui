import { Box, Divider, Grid, Typography } from '@mui/material';

import { PhoneNumbers } from '../../../../common/PhoneNumbers';
import { ContactOptions } from '../../../../common/ContactOptions';
import { FavoriteButton } from '../../../../common/FavoriteButton';
import { ProfileImage } from '../../../../common/ProfileImage';

export const GroupFavoriteCard = ({
  id,
  name,
  mails,
  chats,
  jabberPhone,
  mobilePhone,
}: {
  id: string;
  name: string;
  mails: string[];
  chats: string[];
  jabberPhone: string;
  mobilePhone: string;
}) => {
  return (
    <Grid item xs={3}>
      <Grid
        container
        sx={{
          border: 1,
          borderColor: '#EFEFEF',
          borderRadius: '1rem',
          flexDirection: 'column',
        }}
      >
        <FavoriteButton
          id={id}
          type={'entity'}
          style={{
            position: 'relative',
            right: '40%',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px 12px',
          }}
        >
          <ProfileImage type="group" id={id} style={{ width: '4vw' }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'row',
              gap: 1,
              alignItems: 'center',
              paddingY: '12px',
            }}
          >
            <Typography variant="h6">{name}</Typography>
          </Box>
          <ContactOptions chats={chats} mails={mails} jabberPhone={jabberPhone} />
          <Divider sx={{ width: '80%', backgroundColor: '#EFEFEF', border: 'none', height: '1px' }} />
          <PhoneNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
        </Box>
      </Grid>
    </Grid>
  );
};
