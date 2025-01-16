import { Box, useTheme } from '@mui/material';
import ErrorDialog from '../../assets/images/errorDialog.svg';
import CloseIcon from '../../assets/icons/close.svg';
import i18next from 'i18next';
import { CancelButton } from '../buttons/cancel';
import { SaveButton } from '../buttons/save';
import {
  ButtonContainer,
  CloseButton,
  ContentContainer,
  Dialog,
  DialogContainer,
  Header,
  IconContainer,
  ImageContainer,
  SubHeader,
} from './styledComponents';

export const HaveErrorDialog: React.FC<{
  open: boolean;
  onReturn: any;
  onCancel: any;
  setOpen: (val) => void;
}> = ({ open, setOpen, onReturn, onCancel }) => {
  const theme = useTheme();
  return (
    <Dialog open={!!open} onClose={onCancel} theme={theme}>
      <DialogContainer theme={theme}>
        <IconContainer>
          <CloseButton onClick={() => setOpen(false)} theme={theme}>
            <img src={CloseIcon} alt="Close" style={{ padding: 0 }} />
          </CloseButton>
        </IconContainer>
        <ImageContainer>
          <img src={ErrorDialog} width={'100px'} height={'100px'} alt="Error" />
        </ImageContainer>
        <ContentContainer theme={theme}>
          <Header>{i18next.t('ErrorDialog.header')}</Header>
          <Box>
            <SubHeader>{i18next.t('ErrorDialog.subHeader')}</SubHeader>
            <SubHeader>{i18next.t('ErrorDialog.subHeader2')}</SubHeader>
          </Box>
        </ContentContainer>
        <ButtonContainer>
          <CancelButton value={i18next.t('cancelChanges')} onClick={onCancel} />
          <SaveButton value={i18next.t('dialog.returnToEdit')} onClick={onReturn} />
        </ButtonContainer>
      </DialogContainer>
    </Dialog>
  );
};
