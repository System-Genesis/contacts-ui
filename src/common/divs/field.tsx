import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { ChangeEvent } from 'react';
import hide from '../../assets/icons/hide.svg';
import unHide from '../../assets/icons/unHide.svg';

export const FieldDiv = ({
  field,
  value,
  isEdit = false,
  editable = false,
  hidable = false,
  onChange = (event: ChangeEvent) => ({}),
  onHide = (isHidden: boolean) => ({}),
  isHidden = false,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {isEdit && (
        <IconButton sx={{ m: 0, p: 0, width: 10 }} onClick={() => onHide(isHidden)}>
          {hidable && <img src={isHidden ? unHide : hide} width={18} style={{ padding: 0 }} />}
        </IconButton>
      )}
      <Typography sx={{ flex: '0.2', color: theme.colors.darkGray, fontSize: 12 }}>{field}</Typography>
      {isEdit && editable ? (
        <TextField
          sx={{
            flex: '0.3',

            '& .MuiInput-underline:before': { borderBottom: '1px solid #DCDCDC' },
            '& .MuiInput-input': { p: 0, fontSize: 12 },
          }}
          variant="standard"
          defaultValue={value}
          onChange={onChange}
        />
      ) : (
        <>
          <Typography sx={{ flex: '0.3', fontSize: 12 }}>{value ?? i18next.t('noData')}</Typography>
        </>
      )}
    </Box>
  );
};
