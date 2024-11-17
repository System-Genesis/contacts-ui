import { Box, Typography } from '@mui/material';
import mobilePhoneIcon from '../assets/icons/mobilePhoneIcon.svg';
import mobilePhoneIconHidden from '../assets/icons/mobilePhoneIconHidden.svg';
import redPhoneIcon from '../assets/icons/redPhoneIcon.svg';
import { HiddenLabel } from '../assets/icons/hiddenLabel';

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
      {isHidden ? <HiddenLabel /> : <Typography fontSize={14}>{value}</Typography>}
      <img src={iconSrc} alt={`${type} phone icon`} />
    </Box>
  );
};
