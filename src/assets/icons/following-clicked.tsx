import { useTheme } from '@mui/material';

const FollowingIcon = ({ color }) => {
  const theme = useTheme();

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1296 21.6306C19.4008 21.3594 19.4008 20.9197 19.1296 20.6485L15.1068 16.6257L19.1296 12.6028C19.4008 12.3316 19.4008 11.8919 19.1296 11.6207C18.8584 11.3495 18.4187 11.3495 18.1475 11.6207L14.1247 15.6436C13.5823 16.186 13.5823 17.0653 14.1247 17.6077L18.1475 21.6306C18.4187 21.9018 18.8584 21.9018 19.1296 21.6306Z"
        fill={color ?? theme.colors.white}
        stroke={color ?? theme.colors.white}
        strokeWidth={0.3}
      />
    </svg>
  );
};

export default FollowingIcon;
