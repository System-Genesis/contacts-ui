import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from '../../../common/FavoriteButton';
import { PhoneNumbers } from '../../../common/PhoneNumbers';
import { ContactOptions } from '../../../common/ContactOptions';
import { ProfileImage } from '../../../common/ProfileImage';

export const EntityContactsCard: React.FC<{
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
        // width: 'auto',
        bgcolor: theme.colors.white,
        display: 'flex',
        borderRadius: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Grid item>
        <Grid container gap={2} height={'5rem'}>
          <FavoriteButton
            id={id}
            type={type}
            style={{
              position: 'relative',
              right: '-15px',
              top: '-30px',
            }}
          />

          <Grid item alignContent={'center'} textAlign={'center'}>
            <ProfileImage
              type={entityType === 'GoalUser' ? 'goalUser' : 'entity'}
              id={id}
              style={{ width: '3vw', background: 'red', borderRadius: 100 }}
            />
          </Grid>
          <Grid item>
            <Grid container gap={2} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
              <Grid container gap={1} alignItems={'center'}>
                <Grid item>
                  <Typography fontSize={14} variant="h6">
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    fontSize={14}
                    sx={{
                      backgroundColor: theme.colors.subTitleBack,
                      color: theme.colors.subTitle,
                      borderRadius: '4px',
                    }}
                  >
                    {subTitle}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item gap={1} alignItems={'center'}>
                <Typography fontSize={14} variant="h6">
                  {hierarchy}
                </Typography>
              </Grid>

              <Grid item gap={1} alignItems={'center'}>
                <Typography fontSize={14} variant="h6">
                  tags
                </Typography>
              </Grid>
            </Grid>
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
