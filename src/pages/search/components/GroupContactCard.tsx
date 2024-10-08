import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from '../../../common/FavoriteButton';
import { PhoneNumbers } from '../../../common/PhoneNumbers';
import { ContactOptions } from '../../../common/ContactOptions';
import { ProfileImage } from '../../../common/ProfileImage';

export const GroupContactsCard: React.FC<{
  id: string;
  type: string;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: string[];
  mobilePhone: string;
  jabberPhone: string;
}> = ({ type, id, title, subTitle, hierarchy, mobilePhone, jabberPhone, tags }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        bgcolor: theme.colors.white,
        display: 'flex',
        borderRadius: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 2,
        width: '58.5vw',
      }}
    >
      <Grid item>
        <Grid container gap={1} height={'6.5rem'}>
          <FavoriteButton
            id={id}
            type={type}
            style={{
              position: 'relative',
              right: 4,
              top: -25,
            }}
          />

          <ProfileImage type="group" id={id} style={{ width: '2.75vw', background: '#c1ccc4', borderRadius: 300 }} />
          <Grid item p={1} alignContent={'center'} textAlign={'left'}>
            <Grid
              container
              gap={1}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'90%'}
              wrap="nowrap"
            >
              <Grid item>
                <Grid container gap={1} alignItems={'center'}>
                  <Typography fontSize={14}>{title}</Typography>
                  {subTitle && (
                    <Typography
                      fontSize={14}
                      sx={{
                        backgroundColor: theme.colors.subTitleBack,
                        color: theme.colors.subTitle,
                        borderRadius: '1000px',
                        p: '4px',
                      }}
                    >
                      {subTitle}
                      {/* TODO: LIRAZ ADD COUNT HERE */}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Grid item gap={1} alignItems={'center'}>
                <Typography fontSize={14}>{hierarchy}</Typography>
              </Grid>

              <Grid item gap={1} alignItems={'center'}>
                <Typography fontSize={14}>
                  tags
                  {tags}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item gap={4} pr={1} display={'flex'} flexDirection={'column'}>
        <ContactOptions chats={[]} mails={[]} jabberPhone={jabberPhone} withHi={false} />
        <PhoneNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
      </Grid>
    </Grid>
  );
};
