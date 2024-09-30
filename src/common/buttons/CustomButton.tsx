import { Button, Typography, useTheme } from '@mui/material';
import { CSSProperties } from 'react';

export interface CustomButtonProps {
  variant?: 'outlined' | 'contained';
  onClick?: ((props: any) => void) | undefined;
  icon?: string | undefined;
  iconPosition?: 'left' | 'right' | undefined;
  text?: string | undefined;
  buttonStyles?: CSSProperties;
  textStyles?: CSSProperties;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'text',
  onClick,
  icon,
  iconPosition = 'left',
  text,
  buttonStyles = {},
  textStyles = {},
  disabled = false,
}) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant as 'outlined' | 'contained' | 'text'}
      onClick={onClick}
      sx={{
        columnGap: theme.spacing(1),
        borderRadius: '100px',
        flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
        ':hover': {
          borderColor: buttonStyles?.borderColor ?? 'black',
          bgcolor: buttonStyles?.backgroundColor ?? theme.colors.white,
          opacity: 0.9,
        },
        display: 'inline-flex',
        padding: 0,
        minHeight: 0,
        minWidth: 0,
        ...buttonStyles,
      }}
      disabled={disabled}
    >
      {text !== undefined && (
        <Typography style={{ color: textStyles.color ?? theme.colors.gray, ...textStyles }}>{text}</Typography>
      )}
      {icon && <img src={icon} />}
    </Button>
  );
};
