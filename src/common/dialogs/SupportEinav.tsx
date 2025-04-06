import ErrorDialog from '../../assets/icons/ChatBotWithBackGround.svg';
import CloseIcon from '../../assets/icons/close.svg';
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

export const EinavSupportDialog: React.FC<{
  open: boolean;
  onSave: any;
  onCancel: any;
}> = ({ open, onSave, onCancel }) => {
  const theme = useTheme();

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') return;
    onCancel();
  };

  return (
    <Dialog open={!!open} onClose={handleClose} disableEscapeKeyDown theme={theme}>
      <DialogContainer theme={theme}>
        <IconContainer flex={'10%'} alignSelf={'flex-end'}>
          <IconButton onClick={onCancel}>
            <img src={CloseIcon} style={{ padding: 0 }} />
          </IconButton>
        </IconContainer>
        <ImageContainer>
          <img src={ErrorDialog} width={'100px'} height={'100px'} />
        </ImageContainer>
        <ContentContainer>
          <Header>תודה שבחרת להשתתף בפיילוט!</Header>
          <Box sx={{ justifyItems: 'center' }}>
            <SubHeader>שלחו לנו באגים, תובנות, שאלות, הערות</SubHeader>
            <SubHeader>וכל מה שעולה לכם לראש כדי שנשתפר :)</SubHeader>
          </Box>
        </ContentContainer>
        <ButtonContainer>
          <CancelButton value="בפעם אחרת" onClick={onCancel} />
          <SaveButton value="פתיחת צ'אט" onClick={onSave} disabled={false} />
        </ButtonContainer>
      </DialogContainer>
    </Dialog>
  );
};
