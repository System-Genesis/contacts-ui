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
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import i18next from 'i18next';
import { Option } from '../../../lib/types';
import { getDefaultTags } from '../../../utils/utils';

export const EntityContactsCard: React.FC<{
  id: string;
  type: ResultsTypes;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: { name: string; _id: string }[];
  entityType: string;
  redPhone: string;
  mobilePhone: string;
  jabberPhones: Option[];
  mails: Option[];
  chats: Option[];
  handleSelect: (type: ResultsTypes) => void;
  isSelected: boolean;
  hiddenFields: string[];
  rank: string;
  serviceType?: string;
  sex: 'זכר' | 'נקבה';
  personalNumber: string;
  identityCard: string;
  employeeId: string;
  source: string;
}> = ({
  type,
  id,
  title,
  subTitle,
  hierarchy,
  entityType,
  mobilePhone,
  redPhone,
  jabberPhones,
  tags,
  mails,
  chats,
  isSelected,
  handleSelect,
  rank,
  sex,
  hiddenFields,
  serviceType,
  personalNumber,
  identityCard,
  employeeId,
  source,
}) => {
  const theme = useTheme();
  const currentUser = useSelector((state: RootState) => state.user);

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
            <ProfileImage
              type={entityType === 'GoalUser' ? 'goalUser' : 'entity'}
              identifier={identityCard ?? personalNumber}
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
                    {rank && rank != i18next.t('unknown') && <Typography>{rank}</Typography>}
                    <Title value={title} sx={{ fontWeight: '600' }} />
                    <SubTitle value={subTitle ?? ''} sx={{ fontSize: '14', maxWidth: 'fit-content' }} noToolTip />
                  </Grid>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <Typography fontSize={14}>{hierarchy}</Typography>
                </Grid>

                <Grid item gap={1} alignItems={'center'}>
                  <ContactTags
                    tags={tags}
                    shrunkSize={7}
                    defaultTags={getDefaultTags({
                      entityType,
                      serviceType,
                      personalNumber,
                      identityCard,
                      employeeId,
                      source,
                    })}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3} gap={6} pr={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
          <ContactOptions
            jabberPhones={currentUser.id !== id ? jabberPhones : []}
            chats={currentUser.id !== id ? chats : []}
            mails={currentUser.id !== id ? mails : []}
            hiddenFields={hiddenFields}
            location="searchRes"
          />
          <ContactNumbers redPhone={redPhone} mobilePhone={mobilePhone} hiddenFields={hiddenFields} />
        </Grid>
      </Grid>
    </Grid>
  );
};
