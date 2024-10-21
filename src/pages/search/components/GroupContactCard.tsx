import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from '../../../common/buttons/FavoriteButton';
import { ContactNumbers } from '../../../common/ContactNumbers';
import { ContactOptions } from '../../../common/ContactOptions';
import { ProfileImage } from '../../../common/ProfileImage';
import { ContactTags } from '../../../common/tag/ContactTags';

export const GroupContactsCard: React.FC<{
  id: string;
  type: string;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: { name: string; _id: string }[];
  mobilePhone: string;
  jabberPhone: string;
  isHistory?: boolean;
  mails: string[];
  chats: string[];
}> = ({ type, id, title, subTitle, hierarchy, mobilePhone, jabberPhone, tags, isHistory = false, mails, chats }) => {
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
        width: !isHistory ? '63vw' : '67vw',
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

          <ProfileImage type="group" id={id} style={{ width: '3.25vw' }} />
          <Grid item p={1} alignContent={'center'} textAlign={'left'}>
            <Grid
              container
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              height={'90%'}
              pl={1}
              wrap="nowrap"
              minHeight={'4.5rem'}
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
                <ContactTags tags={tags} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item gap={4} pr={1} display={'flex'} flexDirection={'column'}>
        <ContactOptions jabberPhone={jabberPhone} mails={mails} chats={chats} isGroup />
        <ContactNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} isGroup />
      </Grid>
    </Grid>
  );
};
