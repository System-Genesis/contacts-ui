import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from '../../../common/buttons/FavoriteButton';
import { ContactNumbers } from '../../../common/ContactNumbers';
import { ContactOptions } from '../../../common/ContactOptions';
import { ProfileImage } from '../../../common/ProfileImage';
import { ContactTags } from '../../../common/tag/ContactTags';
import { ResultsTypes } from '../../../lib/enums';

export const EntityContactsCard: React.FC<{
  id: string;
  type: ResultsTypes;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: { name: string; _id: string }[];
  mobilePhone: string;
  jabberPhone: string;
  entityType: string;
  mails: string[];
  chats: string[];
  handleSelect: (type: ResultsTypes) => void;
  isSelected: boolean;
}> = ({
  type,
  id,
  title,
  subTitle,
  hierarchy,
  entityType,
  mobilePhone,
  jabberPhone,
  tags,
  mails,
  chats,
  isSelected,
  handleSelect,
}) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '99%', mb: 1.5 }}>
      <div
        style={{
          marginLeft: '0.5rem',
          right: -12,
          width: '3px',
          height: '83%',
          backgroundColor: isSelected ? theme.colors.darkAqua : 'transparent',
          borderRadius: '30px',
          zIndex: 15,
          placeSelf: 'center',
        }}
      />

      <Grid
        container
        onClick={() => handleSelect(type)}
        sx={{
          bgcolor: theme.colors.white,
          borderRadius: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '1.2rem',
        }}
      >
        <Grid item>
          <Grid container gap={1} height={'6.5rem'}>
            <FavoriteButton
              id={id}
              type={type}
              iconStyle={{
                right: 4,
                top: -25,
              }}
              imageStyle={{
                top: '20px',
              }}
            />

            <ProfileImage
              type={entityType === 'GoalUser' ? 'goalUser' : 'entity'}
              id={id}
              style={{ width: '3.25vw' }}
            />
            <Grid item alignContent={'center'} textAlign={'left'}>
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
                    <Typography fontSize={14} variant="h6">
                      {title}
                    </Typography>
                    {subTitle && (
                      <Typography
                        variant="h6"
                        fontSize={14}
                        sx={{
                          backgroundColor: theme.colors.subTitleBack,
                          color: theme.colors.subTitle,
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem ',
                        }}
                      >
                        {subTitle}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <Typography fontSize={14} variant="h6">
                    {hierarchy}
                  </Typography>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <ContactTags tags={tags} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item gap={4} pr={1} display={'flex'} flexDirection={'column'}>
          <ContactOptions chats={chats} mails={mails} jabberPhone={jabberPhone} />
          <ContactNumbers jabberPhone={jabberPhone} mobilePhone={mobilePhone} />
        </Grid>
      </Grid>
    </Grid>
  );
};
