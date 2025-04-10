import { Box, IconButton, Typography, useTheme } from '@mui/material';
import ErrorDialog from '../../assets/images/errorDialog.svg';
import CloseIcon from '../../assets/icons/close.svg';
import i18next from 'i18next';
import { CancelButton } from '../buttons/cancel';
import { SaveButton } from '../buttons/save';
import {
  ButtonContainer,
  ContentContainer,
  Dialog,
  DialogContainer,
  Header,
  IconContainer,
  ImageContainer,
  SubHeader,
} from './styledComponents';

export const SaveChangesDialog: React.FC<{
  open: boolean;
  onSave: any;
  onCancel: any;
  disabledSave: boolean;
  setOpen: (val) => void;
}> = ({ open, setOpen, onSave, onCancel, disabledSave }) => {
  const theme = useTheme();
  return (
    <Dialog open={!!open} onClose={onCancel} theme={theme}>
      <DialogContainer theme={theme}>
        <IconContainer>
          <IconButton onClick={() => setOpen(false)} sx={{ ml: 2 }}>
            <img src={CloseIcon} style={{ padding: 0 }} />
          </IconButton>
        </IconContainer>
        <ImageContainer>
          <img src={ErrorDialog} width={'100px'} height={'100px'} />
        </ImageContainer>
        <ContentContainer>
          <Header>{i18next.t('dialog.savedChanges')}</Header>
          <Box>
            <SubHeader>{i18next.t('dialog.areYouSure')}</SubHeader>
            <SubHeader>{i18next.t('dialog.afterSave')}</SubHeader>
          </Box>
        </ContentContainer>
        <ButtonContainer>
          <CancelButton value={i18next.t(`cancelChanges`)} onClick={onCancel} />
          <SaveButton value={i18next.t(`save`)} onClick={onSave} disabled={disabledSave} />
        </ButtonContainer>
      </DialogContainer>
    </Dialog>
  );
};
