import { Box, Typography, useTheme } from '@mui/material';
import Tooltip from './toolTip';
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie/smallCircleLoading.json';

export const SubTitle = ({
  value,
  sx = {},
  noToolTip = false,
  isPending = false,
}: {
  value?: string;
  sx?: object;
  noToolTip?: boolean;
  isPending?: boolean;
}) => {
  const theme = useTheme();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
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

  if (isPending)
    return (
      <Box sx={commonStyles}>
        <Lottie options={defaultOptions} height={30} width={30} />
      </Box>
    );

  if (!value || value === 'unknown') return null;

  return noToolTip ? (
    <Typography sx={commonStyles}>{value}</Typography>
  ) : (
    <Tooltip title={value}>
      <Typography sx={commonStyles}>{value}</Typography>
    </Tooltip>
  );
};
