import { Typography, useTheme } from '@mui/material';
import Tooltip from './toolTip';

export const SubTitle = ({
  value,
  sx = {},
  noToolTip = false,
  shorten = false,
}: {
  value?: string;
  sx?: object;
  noToolTip?: boolean;
  shorten?: boolean;
}) => {
  const theme = useTheme();

  if (!value || value === 'unknown') return null;

  const commonStyles = {
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
  };

  const val = !shorten || value.length < 15 ? value : value.slice(0, 12) + '...';

  return noToolTip ? (
    <Typography sx={commonStyles}>{val}</Typography>
  ) : (
    <Tooltip title={value}>
      <Typography sx={commonStyles}>{val}</Typography>
    </Tooltip>
  );
};
