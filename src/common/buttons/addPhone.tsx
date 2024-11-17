import { Box, Typography, IconButton } from '@mui/material';
import add from '../../assets/icons/add.svg';

export const AddPhone = ({ onClick }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, cursor: 'pointer' }}
      onClick={onClick}
    >
      <IconButton sx={{ m: 0, p: 0, width: 10 }}>
        <img src={add} width={18} style={{ padding: 0 }} />{' '}
      </IconButton>
      <Typography sx={{ flex: '1', fontSize: 12 }}>טלפון נוסף</Typography>
    </Box>
  );
};
