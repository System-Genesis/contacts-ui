import { Box, Typography, useTheme } from '@mui/material';
import { CustomButton, CustomButtonProps } from '../buttons/CustomButton';
import { CSSProperties } from 'react';

interface Props {
  title: string;
  titleProps?: { children?: React.ReactNode; style: CSSProperties };
  buttonProps?: CustomButtonProps;
  divStyle?: CSSProperties;
}

const Title = ({ title, buttonProps, titleProps, divStyle }: Props) => {
  const { children, style } = titleProps ?? {};
  const theme = useTheme();
  return (
    <Box
      style={divStyle}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography color={theme.colors.profile.title} style={style ?? {}}>
        {title}
        {children}
      </Typography>
      {buttonProps && <CustomButton {...buttonProps} />}
    </Box>
  );
};

export default Title;
