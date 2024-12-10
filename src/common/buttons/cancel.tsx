import { Button, useTheme } from '@mui/material';

export const CancelButton = ({ value, onClick }) => {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      sx={{
        color: theme.colors.aqua,
        width: '7rem',
        fontSize: 14,
        borderRadius: '30px',
        borderColor: theme.colors.aqua,
        backgroundColor: theme.colors.white,
        '&:hover': { borderColor: theme.colors.aqua, backgroundColor: theme.colors.white },
      }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};
