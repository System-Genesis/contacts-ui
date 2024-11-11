import { Button, useTheme } from '@mui/material';
import { SaveIcon } from '../../assets/icons/save';

export const SaveButton = ({ value, onClick }) => {
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
      }}
      endIcon={<SaveIcon />}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};
