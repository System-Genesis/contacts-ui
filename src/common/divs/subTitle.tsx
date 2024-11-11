import { Typography, useTheme } from '@mui/material';
import Tooltip from './toolTip';

export const SubTitle = ({ value, sx = {} }) => {
  const theme = useTheme();
  return (
    value && (
      <Tooltip title={value}>
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
      </Tooltip>
    )
  );
};