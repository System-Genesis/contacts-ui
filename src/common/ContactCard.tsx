import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from './FavoriteButton';
import { PhoneNumbers } from './PhoneNumbers';
import { ContactOptions } from './ContactOptions';
import { ProfileImage } from './ProfileImage';

export const ContactsCard: React.FC<{
  id: string;
  type: string;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: string[];
  mobilePhone: string;
  jabberPhone: string;
  entityType: string;
}> = ({ type, id, title, subTitle, hierarchy, entityType, mobilePhone, jabberPhone, tags }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        width: '100%',
        bgcolor: theme.colors.white,
        display: 'flex',
        borderRadius: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Grid item>
        <Grid container gap={'16px'}>
          <FavoriteButton
            id={id}
            type={type}
            style={{
              bottom: '30px',
              left: '15px',
            }}
          />
          <Grid item>
            <ProfileImage type={entityType === 'GoalUser' ? 'goalUser' : 'entity'} id={id} style={{ width: '4vw' }} />
          </Grid>
          <Grid item>
            <Grid container gap={'8px'}>
              <Typography variant="h6">{title}</Typography>
              {subTitle && (
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
                  {subTitle}
                </Typography>
              )}
            </Grid>
            <Typography variant="h6">{hierarchy}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ContactOptions chats={[]} mails={[]} jabberPhone={jabberPhone} />
        <PhoneNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
      </Grid>
    </Grid>
  );
};
