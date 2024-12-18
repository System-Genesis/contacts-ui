import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import hide from '../../assets/icons/hide.svg';
import unHide from '../../assets/icons/unHide.svg';
import remove from '../../assets/icons/remove.svg';
import { HiddenLabel } from '../../assets/icons/hiddenLabel';
export const FieldDiv = ({
  icon = '',
  field,
  value,
  isEdit = false,
  editable = false,
  hidable = false,
  removable = false,
  isHidden = false,
  helperText = '',
  onChange,
  onHide,
  onRemove,
  validation,
}: {
  field: string;
  value: string;
  isEdit?: boolean;
  editable?: boolean;
  hidable?: boolean;
  removable?: boolean;
  isHidden?: boolean;

  icon?: string;
  helperText?: string;

  onChange?: (event: ChangeEvent) => void;
  onHide?: (isHidden: boolean) => void;
  onRemove?: () => void;
  validation?: (value: string) => boolean;
}) => {
  const theme = useTheme();

  return (
    (isEdit || value) && (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: '1.2rem',
        }}
      >
        {isEdit && (
          <IconButton
            sx={{ m: 0, p: 0, width: 10, mr: 1 }}
            onClick={() => {
              if (hidable) onHide?.(isHidden);
              if (removable) onRemove?.();
            }}
          >
            {hidable && <img src={isHidden ? hide : unHide} width={18} style={{ padding: 0 }} />}
            {removable && <img src={remove} width={18} style={{ padding: 0 }} />}
          </IconButton>
        )}
        <Box sx={{ flex: '0.2', display: 'flex', alignItems: 'center' }}>
          {icon && <img src={icon} width={16} style={{ marginLeft: 5 }} />}
          <Typography sx={{ color: theme.colors.darkGray, fontSize: 12 }}>{field}</Typography>
        </Box>

        {isEdit && editable && (
          <TextField
            sx={{
              flex: '0.4',
              '& .MuiInput-underline': { borderBottom: '1px solid #DCDCDC' },
              '& .MuiInput-input': { p: '0.2rem 0', fontSize: 12 },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-14px',
                fontSize: 10,
                color: 'red',
              },
            }}
            variant="standard"
            onChange={onChange}
            value={value}
            helperText={!validation?.(value) ? helperText : ''}
            error={!validation?.(value)}
          />
        )}

        {((isEdit && !editable) || (!isEdit && !isHidden)) && (
          <Typography sx={{ flex: '0.4', fontSize: 12 }}>{value}</Typography>
        )}

        {isHidden && (
          <Box sx={{ flex: isEdit ? '0.3' : '0', alignItems: 'center', width: '2rem', textAlign: 'center' }}>
            <HiddenLabel />
          </Box>
        )}
      </Box>
    )
  );
};
