import { Box, Typography } from '@mui/material';
import mobilePhoneIcon from '../assets/icons/mobile-phone.svg';
import jabberPhoneIcon from '../assets/icons/jabberPhoneIcon.svg';

export const PhoneNumbers = ({ jabberPhone, mobilePhone }: { jabberPhone?: string; mobilePhone?: string }) => {
  return (
    <Box display={'flex'} gap={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography fontSize={14}>{mobilePhone ?? '050-0000000'}</Typography>
        <img src={mobilePhoneIcon} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography fontSize={14}>{jabberPhone ?? '6000000'}</Typography>
        <img src={jabberPhoneIcon} />
      </Box>
    </Box>
  );
};
