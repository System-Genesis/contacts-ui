import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import hide from '../../assets/icons/hide.svg';
import unHide from '../../assets/icons/unHide.svg';
import remove from '../../assets/icons/remove.svg';
import { HiddenLabel } from '../../assets/icons/hiddenLabel';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { validateForm } from '../../store/reducers/drawer';
export const FieldDiv = ({
  field = '',
  fieldLabel,
  value,
  editable = false,
  hidable = false,
  removable = false,
  isHidden = false,
  required = false,
  icon = '',
  keyFilter = /\S\s/,
  lengthLimit = 999,
  onChange,
  onHide,
  onRemove,
  onClick = () => ({}),
  sx = {},
}: {
  field?: string;
  fieldLabel: string;
  value: string;
  editable?: boolean;
  hidable?: boolean;
  removable?: boolean;
  isHidden?: boolean;
  required?: boolean;

  keyFilter?: RegExp;
  lengthLimit?: number;
  icon?: string;

  onChange?: (event: ChangeEvent) => void;
  onHide?: (isHidden: boolean) => void;
  onRemove?: () => void;
  onClick?: () => void;

  sx: object;
}) => {
  const dispatch = useDispatch();

  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);
  const validationError = useSelector((state: RootState) => state.drawer.validationError[field]);
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= lengthLimit) {
      dispatch(validateForm({ field, value: event.target.value, required }));
      onChange?.(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const isNavigationKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key);
    const isControlOrCmd = event.ctrlKey || event.metaKey; // Check for Control or Command key

    // Check if key is a number, '*' or a navigation key, or control actions (Ctrl + A, Ctrl + C, Ctrl + V)
    const isValidKey =
      keyFilter.test(key) || isNavigationKey || (isControlOrCmd && ['a', 'c', 'v', 'x'].includes(key.toLowerCase()));

    if (!isValidKey) event.preventDefault();
  };
  return (
    (value || (isEdit && editable)) && (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          ...(isEdit && { height: '1.2rem' }),
          ...sx,
        }}
        onClick={onClick}
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
        <Box
          sx={{
            flex: '0.2',
            display: 'flex',
            gap: 0.5,
            height: '100%',
            alignItems: 'flex-start',
          }}
        >
          {icon && <img src={icon} width={16} style={{ marginLeft: 5 }} />}
          <Typography sx={{ color: theme.colors.darkGray, fontSize: 12 }}>{fieldLabel}</Typography>
          <Typography sx={{ color: theme.colors.red, fontSize: 12 }}>{required && isEdit ? '*' : ''}</Typography>
        </Box>
        {isEdit && editable && (
          <TextField
            sx={{
              flex: '0.45',
              '& .MuiInput-underline': { borderBottom: '1px solid #DCDCDC' },
              '& .MuiInput-input': { p: '0.2rem 0', fontSize: 12 },
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: '-14px',
                fontSize: 10,
                color: theme.colors.red,
              },
            }}
            variant="standard"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={value}
            helperText={validationError?.errorMessage}
            error={validationError?.isError}
          />
        )}

        {((isEdit && !editable) || (!isEdit && !isHidden)) && (
          <Typography sx={{ flex: !editable && !hidable ? '0.8' : '0.45', fontSize: 12 }}>{value}</Typography>
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
