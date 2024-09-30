import { Box, Stack, Typography, useTheme } from '@mui/material';
import outlookIcon from '../../../assets/icons/outlook.svg';
import hiChatIcon from '../../../assets/icons/hiChat.svg';
import favorites from '../../../assets/icons/favorites.svg';
import jubberPhoneIcon from '../../../assets/icons/jubberPhoneIcon.svg';
import mobilePhoneIcon from '../../../assets//icons/mobilePhoneIcon.svg';

export const ContactsCard: React.FC<{
  image: any;
  title: string;
  subTitle: string;
  hierarchy: string;
  tags: string[];
  mobilePhone: string;
  jubberPhone: string;
}> = ({ image, title, subTitle, hierarchy, mobilePhone, jubberPhone, tags }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: '#F0F2F8',
          display: 'flex',
          flexDirection: 'row',
          borderRadius: '15px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img style={{ position: 'absolute', top: 5, right: 5 }} height="25" src={favorites} />
        <img style={{ flex: 1, marginRight: '18px', paddingBottom: '5px' }} height="55" src={image} />

        <Box flex={12} sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(1), marginLeft: '20px' }}>
          <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography sx={{ color: theme.colors.black, marginRight: '10px' }}>{title}</Typography>
                <Typography
                  sx={{
                    color: theme.colors.green,
                    backgroundColor: theme.colors.lightGreen,
                    borderRadius: '6px',
                    padding: '2px 5px',
                    display: 'inline-block',
                  }}
                >
                  {subTitle}
                </Typography>
              </Box>
              <Box>
                <img width={25} height={25} src={hiChatIcon} />
                <img width={25} height={25} src={outlookIcon} />
              </Box>
            </Box>
            <Typography>{hierarchy}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {tags.map((tag) => {
                  return (
                    <Typography
                      sx={{
                        color: theme.colors.black,
                        backgroundColor: theme.colors.lightGray,
                        borderRadius: '6px',
                        padding: '2px 5px',
                        display: 'inline-block',
                        marginRight: '5px',
                      }}
                    >
                      {tag}
                    </Typography>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography>{jubberPhone}</Typography>
                <img style={{ marginLeft: '10px', marginRight: '5px' }} width={15} src={jubberPhoneIcon} />
                <Typography>{mobilePhone}</Typography>
                <img style={{ marginLeft: '15px', marginRight: '5px' }} width={15} src={mobilePhoneIcon} />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
