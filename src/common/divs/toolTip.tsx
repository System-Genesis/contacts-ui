import { ReactNode } from 'react';
import { Tooltip as MuiTooltip, tooltipClasses, styled, TooltipProps as MuiTooltipProps } from '@mui/material';

interface TooltipProps extends Omit<MuiTooltipProps, 'children'> {
  title: ReactNode;
  children: ReactNode;
}

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} arrow placement="top" />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    color: '#fff',
    fontSize: 13,
    p: 2,
  },
});

export default Tooltip;
