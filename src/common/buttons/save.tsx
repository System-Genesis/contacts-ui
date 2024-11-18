import { Button, useTheme } from '@mui/material';
import { SaveIcon } from '../../assets/icons/save';

export const SaveButton = ({
  value,
  disabled = false,
  withEndIcon = false,
  onClick = () => ({}),
}: {
  value: any;
  disabled: boolean;
  withEndIcon: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        color: theme.colors.white,
        backgroundColor: theme.colors.aqua,
        borderRadius: '30px',
        fontSize: 14,
        p: '0 1rem',
        '&:hover': { backgroundColor: theme.colors.darkAqua },
        '&.Mui-disabled': {
          color: theme.colors.white,
          backgroundColor: theme.colors.aquaLight,
        },
      }}
      endIcon={withEndIcon && <SaveIcon />}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </Button>
  );
};
