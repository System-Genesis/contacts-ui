import { Box, Stack, Typography, useTheme } from '@mui/material';
import outlookIcon from '../../../assets/icons/outlook.svg';
import hiChatIcon from '../../../assets/icons/hiChat.svg';
import favorites from '../../../assets/icons/favorites.svg';
import jubberPhoneIcon from '../../../assets/icons/jubberPhoneIcon.svg';
import mobilePhoneIcon from '../../../assets//icons/mobilePhoneIcon.svg';

export const ContactsCard: React.FC<{
  image: any;
  title: string;
  subTitle: string | undefined;
  hierarchy: string | undefined;
  tags: string[];
  mobilePhone: string;
  jubberPhone: string;
}> = ({ image, title, subTitle, hierarchy, mobilePhone, jubberPhone, tags }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: theme.colors.white,
        display: 'flex',
        borderRadius: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(3),
      }}
    >
      <img
        style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', height: 24, width: 24 }}
        src={favorites}
      />
      <img
        style={{
          flex: 1,
          marginLeft: theme.spacing(2),
          height: 60,
          width: 60,
        }}
        src={image}
      />

      <Stack flex={15} sx={{ rowGap: theme.spacing(1.25) }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 14, color: theme.colors.black, marginRight: theme.spacing(1.25) }}>
              {title}
            </Typography>
            {subTitle && (
              <Typography
                sx={{
                  color: theme.colors.green,
                  backgroundColor: theme.colors.lightGreen,
                  borderRadius: 6,
                  padding: '2px 5px',
                  display: 'inline-block',
                }}
              >
                {subTitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', columnGap: theme.spacing(1.25) }}>
            <img width={28} height={28} src={hiChatIcon} />
            <img width={28} height={28} src={outlookIcon} />
          </Box>
        </Box>
        {hierarchy && <Typography sx={{ fontSize: 14 }}>{hierarchy}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', columnGap: theme.spacing(0.5) }}>
            {tags.map((tag) => {
              return (
                <Typography
                  sx={{
                    fontSize: 14,
                    color: theme.colors.black,
                    backgroundColor: theme.colors.grey,
                    borderRadius: theme.spacing(5),
                    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)} ${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
                    display: 'inline-block',
                    marginRight: theme.spacing(0.5),
                  }}
                >
                  {tag}
                </Typography>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', columnGap: theme.spacing(2) }}>
            <Box sx={{ display: 'flex', columnGap: theme.spacing(1) }}>
              <Typography sx={{ fontSize: 14 }}>{jubberPhone}</Typography>
              <img width={16} height={16} src={jubberPhoneIcon} />
            </Box>
            <Box sx={{ display: 'flex', columnGap: theme.spacing(1) }}>
              <Typography sx={{ fontSize: 14 }}>{mobilePhone}</Typography>
              <img width={16} height={16} src={mobilePhoneIcon} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
