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
import { Option } from '../../../lib/types';

export const GroupContactsCard: React.FC<{
  id: string;
  type: ResultsTypes;
  title: string;
  subTitle: number | string;
  hierarchy: string | undefined;
  tags: { name: string; _id: string }[];
  mobilePhone: string;
  redPhone: string;
  jabberPhones: Option[];
  mails: Option[];
  chats: Option[];
  handleSelect: (type: ResultsTypes) => void;
  isSelected?: boolean;
  hiddenFields: string[];
}> = ({
  type,
  id,
  title,
  subTitle,
  hierarchy,
  mobilePhone,
  redPhone,
  jabberPhones,
  tags,
  mails,
  chats,
  isSelected,
  handleSelect,
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
        <Grid item xs={9.5} display={'flex'} flexDirection={'column'} mb={1}>
          <Grid container ml={0.5} mt={0.5}>
            <FavoriteButton
              id={id}
              type={type}
              imageStyle={{ top: '20px' }}
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
            height={'5.5rem'}
            alignContent={'center'}
            onClick={() => handleSelect(type)}
            sx={{ cursor: 'pointer' }}
            alignItems={'center'}
            wrap="nowrap"
          >
            <ProfileImage type="group" id={id} style={{ width: '4.2rem', height: '4.2rem' }} />
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
                    <Title value={title} sx={{ fontWeight: '600' }} />
                    <SubTitle value={subTitle ?? ''} sx={{ borderRadius: '50%' }} />
                  </Grid>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <Typography fontSize={14}>{hierarchy}</Typography>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <ContactTags tags={tags} shrunkSize={7} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3} gap={4} pr={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
          <ContactOptions
            jabberPhones={jabberPhones}
            mails={mails}
            chats={chats}
            isGroup
            hiddenFields={hiddenFields}
            location="searchRes"
          />
          <ContactNumbers redPhone={redPhone} mobilePhone={mobilePhone} isGroup hiddenFields={hiddenFields} />
        </Grid>
      </Grid>
    </Grid>
  );
};
