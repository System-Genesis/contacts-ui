import ErrorDialog from '../../assets/images/errorDialog.svg';
import CloseIcon from '../../assets/icons/close.svg';
import i18next from 'i18next';
import { CancelButton } from '../buttons/cancel';
import { SaveButton } from '../buttons/save';
import { Box, IconButton, useTheme } from '@mui/material';
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

export const ChatBotDialog: React.FC<{
  open: boolean;
  onSave: any;
  onCancel: any;
}> = ({ open, onSave, onCancel }) => {
  const theme = useTheme();

  return (
    <Dialog open={!!open} onClose={onCancel} theme={theme}>
      <DialogContainer theme={theme}>
        <IconContainer flex={'10%'} alignSelf={'flex-end'}>
          <IconButton onClick={onCancel} sx={{ ml: 2 }}>
            <img src={CloseIcon} style={{ padding: 0 }} />
          </IconButton>
        </IconContainer>
        <ImageContainer>
          <img src={ErrorDialog} width={'100px'} height={'100px'} />
        </ImageContainer>
        <ContentContainer>
          <Header>{i18next.t('chatBotDialog.wereHereToHelp')}</Header>
          <Box>
            <SubHeader>{i18next.t('chatBotDialog.haveAProblem')}</SubHeader>
            <SubHeader>{i18next.t('chatBotDialog.weWouldLikeToHelp')}</SubHeader>
          </Box>
        </ContentContainer>
        <ButtonContainer>
          <CancelButton value={i18next.t(`chatBotDialog.noThankYou`)} onClick={onCancel} />
          <SaveButton value={i18next.t(`chatBotDialog.openIssue`)} onClick={onSave} disabled={false} />
        </ButtonContainer>
      </DialogContainer>
    </Dialog>
  );
};
