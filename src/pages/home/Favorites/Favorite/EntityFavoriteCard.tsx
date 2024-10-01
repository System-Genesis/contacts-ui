import { Box, Divider, Grid, Typography } from '@mui/material';

import { PhoneNumbers } from '../../../../common/PhoneNumbers';
import { ContactOptions } from '../../../../common/ContactOptions';
import { FavoriteButton } from '../../../../common/FavoriteButton';
import { ProfileImage } from '../../../../common/ProfileImage';

export const EntityFavoriteCard = ({
  id,
  fullName,
  jobTitle,
  mails,
  chats,
  jabberPhone,
  mobilePhone,
  entityType,
}: {
  id: string;
  fullName: string;
  entityType: string;
  jobTitle: string;
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
            padding: ' 0px 12px',
          }}
        >
          <ProfileImage type={entityType === 'GoalUser' ? 'goalUser' : 'entity'} id={id} style={{ width: '4vw' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'row',
              gap: 1,
              alignItems: 'center',
              paddingY: '12px',
            }}
          >
            <Typography variant="h6">{fullName}</Typography>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#F3FAF8',
                color: '#2A5B5B',
                borderRadius: '4px',
                paddingX: '8px',
                paddingY: '4px',
                fontSize: '0.75rem',
              }}
            >
              {jobTitle}
            </Typography>
          </Box>
          <ContactOptions jabberPhone={jabberPhone} mails={mails} chats={chats} />
          <Divider sx={{ width: '80%', backgroundColor: '#EFEFEF', border: 'none', height: '1px' }} />
          <PhoneNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
        </Box>
      </Grid>
    </Grid>
  );
};
