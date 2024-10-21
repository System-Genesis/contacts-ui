import { Box, Typography } from '@mui/material';
import mobilePhoneIcon from '../assets/icons/mobilePhoneIcon.svg';
import mobilePhoneIconHidden from '../assets/icons/mobilePhoneIconHidden.svg';
import jabberPhoneIcon from '../assets/icons/jabberPhoneIcon.svg';

export const ContactNumber = ({
  value,
  type,
  isHidden = false,
}: {
  value: string;
  type: 'mobile' | 'jabber';
  isHidden?: boolean;
}) => {
  const iconSrc = type === 'mobile' ? (isHidden ? mobilePhoneIconHidden : mobilePhoneIcon) : jabberPhoneIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <Typography fontSize={14} color={isHidden ? 'gray' : ''}>
        {isHidden ? 'מוסתר' : value}
      </Typography>
      <img src={iconSrc} alt={`${type} phone icon`} />
    </Box>
  );
};
