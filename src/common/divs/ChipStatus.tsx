import { useTheme, Box, styled } from '@mui/material';
import i18next from 'i18next';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  fontWeight: 'normal',
  alignItems: 'center',
  justifyContent: 'center',
  height: '3.3vh',
  width: '8.95vw',
  padding: '0.55vw',
  borderRadius: '106px',
  //[`&.${config.requestStatus.done}`]: {
  '&.done': {
    color: theme.colors.status.text.green,
    backgroundColor: theme.colors.status.background.green,
  },
  '&.inProgress': {
    color: theme.colors.status.text.purple,
    backgroundColor: theme.colors.status.background.purple,
  },
  '&.denied, &.failed, &.expired': {
    color: theme.colors.status.text.red,
    backgroundColor: theme.colors.status.background.red,
  },
  '&.waiting_commander_approval, &.waiting_kabam_approval, &.waiting_HR_approval': {
    color: theme.colors.status.text.blue,
    backgroundColor: theme.colors.status.background.blue,
  },
}));

const ChipStatus = ({ status }) => {
  const theme = useTheme();

  return (
    <StyledBox className={status} theme={theme}>
      {i18next.t(`request.statuses.${status}`)}
    </StyledBox>
  );
};

export default ChipStatus;
