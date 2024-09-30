import { Box } from '@mui/material';

const LinkButton = ({ onClick, isSelected, text, sx = {} }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        borderBottom: isSelected ? '2px solid rgba(36, 155, 155, 1)' : '1px solid rgba(211, 207, 221, 1)',
        height: '100%',
        fontWeight: isSelected ? 'bold' : 'normal',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
          cursor: 'pointer',
        },
        ...(isSelected && { color: '#249B9B' }),
        ...sx,
      }}
    >
      {text}
    </Box>
  );
};

export default LinkButton;
