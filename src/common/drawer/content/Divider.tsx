import { Divider, Grid, styled } from '@mui/material';

export const StyledDivider = styled(Divider)(({ theme }) => ({
  border: `1px solid ${theme.colors.gray}`,
}));

export const StyledGridSection = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
}));

export const StyledGridInfo = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  flexWrap: 'nowrap',
}));
