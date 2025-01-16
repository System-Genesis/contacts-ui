import { styled } from '@mui/material/styles';
import { Dialog as MuiDialog, IconButton as MuiIconButton, Box as MuiBox, Typography } from '@mui/material';

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '385px',
    height: '415px',
    margin: 'auto',
    borderRadius: '20px',
    paddingBottom: theme.spacing(1),
  },
}));

export const DialogContainer = styled(MuiBox)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #D8EFE8 65%, white 35%)',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
  alignItems: 'center',
}));

export const CloseButton = styled(MuiIconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

export const IconContainer = styled(MuiBox)(() => ({
  flex: '10%',
  alignSelf: 'flex-end',
}));

export const ImageContainer = styled(MuiBox)(() => ({
  flex: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ContentContainer = styled(MuiBox)(({ theme }) => ({
  flex: '40%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  rowGap: theme.spacing(3),
}));

export const ButtonContainer = styled(MuiBox)(() => ({
  flex: '10%',
  display: 'flex',
  justifyContent: 'center',
  columnGap: 16,
}));

export const Header = styled(Typography)(() => ({
  fontSize: 20,
  color: '#223F3B',
  fontWeight: 'bold',
}));

export const SubHeader = styled(Typography)(() => ({
  fontSize: 14,
  color: '#656565',
  textAlign: 'center',
}));
