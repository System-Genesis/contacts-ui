import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <Grid item>
      <FavoriteButton
        id={id}
        type={'entity'}
        style={{
          position: 'relative',
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
          height: '17.5rem',
          minHeight: '17.5rem',
          padding: '1rem 1rem 0.2rem 1rem',
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
          <ProfileImage type={entityType === 'GoalUser' ? 'goalUser' : 'entity'} id={id} style={{ width: '3.5rem' }} />

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
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100px',
              }}
              variant="h6"
            >
              {fullName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: theme.colors.subTitleBack,
                color: theme.colors.subTitle,
                borderRadius: '4px',
                paddingX: '8px',
                paddingY: '4px',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100px',
              }}
            >
              {jobTitle}
            </Typography>
          </Box>
          <ContactOptions jabberPhone={jabberPhone} mails={mails} chats={chats} />
          <Divider sx={{ width: '90%', backgroundColor: '#EFEFEF', border: 'none', height: '1px' }} />
          <PhoneNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
        </Box>
      </Grid>
    </Grid>
  );
};
