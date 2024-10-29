import { Box, Divider, Grid, Typography } from '@mui/material';

import { ContactNumbers } from '../../../../common/ContactNumbers';
import { ContactOptions } from '../../../../common/ContactOptions';
import { FavoriteButton } from '../../../../common/buttons/FavoriteButton';
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
          borderColor: '#EFEFEF',
          borderRadius: '1rem',
          flexDirection: 'column',
          minWidth: '17.5rem',
          width: '17.5rem',
          height: '16rem',
          minHeight: '16rem',
          padding: '1rem',
          margin: '0.25rem 0.5rem',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ProfileImage type="group" id={id} style={{ width: '3.5rem' }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'row',
              gap: 1,
              alignItems: 'center',
              padding: '1rem 0 0 0 ',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100px',
              }}
            >
              {name}
            </Typography>
          </Box>
          <ContactOptions chats={chats} mails={mails} jabberPhone={jabberPhone} isGroup />
          <Divider sx={{ width: '90%', backgroundColor: '#EFEFEF', border: 'none', height: '1px' }} />
          <ContactNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} isGroup />
        </Box>
      </Grid>
    </Grid>
  );
};
