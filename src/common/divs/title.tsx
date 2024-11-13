import { Typography } from '@mui/material';

export const Title = ({ value, sx = {} }) => {
  return (
    <Typography
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
        ...sx,
      }}
    >
      {value}
    </Typography>
  );
};
