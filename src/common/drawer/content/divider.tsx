import { Divider, Grid, styled } from '@mui/material';

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(0.5),

  border: `1px solid ${theme.colors.gray}`,
}));

export const StyledGridSection = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.8),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

export const StyledGridInfo = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  flexWrap: 'nowrap',
}));
