import { Box, Typography } from '@mui/material';
import mobilePhoneIcon from '../assets/icons/mobile-phone.svg';
import jabberPhoneIcon from '../assets/icons/jabberPhoneIcon.svg';

export const PhoneNumbers = ({ jabberPhone, mobilePhone }: { jabberPhone?: string[]; mobilePhone?: string[] }) => {
  return (
    <Box display={'flex'} gap="12px">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingY: '16px',
          gap: '4px',
        }}
      >
        <Typography variant="h6">{mobilePhone?.[0] ?? 'לא הוזן'}</Typography>
        <img src={mobilePhoneIcon} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography variant="h6">{jabberPhone?.[0] ?? 'לא הוזן'}</Typography>
        <img src={jabberPhoneIcon} />
      </Box>
    </Box>
  );
};
