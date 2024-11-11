import { Typography, useTheme } from '@mui/material';

export const SubTitle = ({ value, sx = {} }) => {
  const theme = useTheme();
  return (
    value && (
      <Typography
        sx={{
          backgroundColor: theme.colors.subTitleBack,
          color: theme.colors.subTitle,
          borderRadius: '4px',
          paddingX: '8px',
          paddingY: '4px',
          fontSize: 14,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px',
          ...sx,
        }}
      >
        {value}
      </Typography>
    )
  );
};
