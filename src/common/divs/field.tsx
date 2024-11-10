import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { ChangeEvent } from 'react';
import hide from '../../assets/icons/hide.svg';
import unHide from '../../assets/icons/unHide.svg';

export const FieldDiv = ({
  field,
  value,
  isEdit = false,
  onChange = (event: ChangeEvent) => {},
  isHidden = false,
  onHide = (isHidden: boolean) => {},
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      {isEdit ? (
        <>
          <IconButton sx={{ m: 0 }} onClick={() => onHide(isHidden)}>
            <img src={isHidden ? unHide : hide} width={'24rem'} style={{ padding: 0 }} />
          </IconButton>
          <TextField
            sx={{ flex: '3', fontSize: 12 }}
            label={field}
            variant="standard"
            defaultValue={value}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <Typography sx={{ flex: '1', color: theme.colors.darkGray, fontSize: 12 }}>{field}</Typography>
          <Typography sx={{ flex: '3', fontSize: 12 }}>{value ?? i18next.t('noData')}</Typography>
        </>
      )}
    </Box>
  );
};
