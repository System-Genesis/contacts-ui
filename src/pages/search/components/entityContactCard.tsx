import { Grid, Typography, useTheme } from '@mui/material';
import { FavoriteButton } from '../../../common/buttons/favoriteButton';
import { ContactNumbers } from '../../../common/contactNumbers';
import { ContactOptions } from '../../../common/contactOptions';
import { ProfileImage } from '../../../common/profileImage';
import { ContactTags } from '../../../common/tag/contactTags';
import { ResultsTypes } from '../../../lib/enums';
import { SelectedSign } from './selectedSign';
import { Title } from '../../../common/divs/title';
import { SubTitle } from '../../../common/divs/subTitle';
import { Option } from '../../../common/contactMenu';

export const EntityContactsCard: React.FC<{
  id: string;
  type: ResultsTypes;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: { name: string; _id: string }[];
  mobilePhone: string;
  jabberPhone: string;
  redPhone: string;
  entityType: string;
  mails: Option[];
  chats: Option[];
  handleSelect: (type: ResultsTypes) => void;
  isSelected: boolean;
  hiddenFields: string[];
  rank: string;
  sex: 'male' | 'female';
}> = ({
  type,
  id,
  title,
  subTitle,
  hierarchy,
  entityType,
  mobilePhone,
  redPhone,
  jabberPhone,
  tags,
  mails,
  chats,
  isSelected,
  handleSelect,
  rank,
  sex,
  hiddenFields,
}) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '99%', mb: 2 }}>
      <SelectedSign isSelected={isSelected} theme={theme} />

      <Grid
        container
        wrap="nowrap"
        sx={{
          bgcolor: theme.colors.white,
          borderRadius: 4,
          alignItems: 'center',
          p: 2,
        }}
      >
        <Grid item xs={9.5} display={'flex'} flexDirection={'column'}>
          <Grid container ml={0.5} mt={0.5}>
            <FavoriteButton
              id={id}
              type={type}
              imageStyle={{
                top: '20px',
              }}
              iconStyle={{
                right: 4,
                top: -25,
              }}
            />
          </Grid>

          <Grid
            container
            gap={1}
            ml={3.5}
            mb={1}
            height={'5.5rem'}
            alignContent={'center'}
            onClick={() => handleSelect(type)}
            sx={{ cursor: 'pointer' }}
            alignItems={'center'}
            wrap="nowrap"
          >
            <ProfileImage
              type={entityType === 'GoalUser' ? 'goalUser' : 'entity'}
              id={id}
              style={{ width: '4.2rem', height: '4.2rem' }}
              sex={sex}
            />
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
                gap={1.5}
              >
                <Grid item>
                  <Grid container gap={1} alignItems={'center'}>
                    {rank && <Typography fontSize={12}>{rank}</Typography>}
                    <Title value={title} />
                    <SubTitle value={subTitle} sx={{ fontSize: '14', maxWidth: 'fit-content' }} />
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

        <Grid item xs={3} gap={4} pr={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
          <ContactOptions jabberPhone={jabberPhone} chats={chats} mails={mails} hiddenFields={hiddenFields} />
          <ContactNumbers redPhone={redPhone} mobilePhone={mobilePhone} hiddenFields={hiddenFields} />
        </Grid>
      </Grid>
    </Grid>
  );
};
