import { Typography } from '@mui/material';

export const Title = ({ value, sx = {} }) => {
  return (
    <Typography
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100px',
        ...sx,
      }}
    >
      {value}
    </Typography>
  );
};
