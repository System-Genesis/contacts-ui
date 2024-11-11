import { Box, Typography } from '@mui/material';
import mobilePhoneIcon from '../assets/icons/mobilePhoneIcon.svg';
import mobilePhoneIconHidden from '../assets/icons/mobilePhoneIconHidden.svg';
import redPhoneIcon from '../assets/icons/redPhoneIcon.svg';

export const ContactNumber = ({
  value,
  type,
  isHidden = false,
}: {
  value: string;
  type: 'mobile' | 'red';
  isHidden?: boolean;
}) => {
  const iconSrc = type === 'mobile' ? (isHidden ? mobilePhoneIconHidden : mobilePhoneIcon) : redPhoneIcon;

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
