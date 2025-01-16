import icon from '../../assets/icons/icon.svg';
import CloseIcon from '../../assets/icons/close.svg';
import i18next from 'i18next';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const SurveyDialog: React.FC<{
  open: boolean;
  setOpen: any;
}> = ({ open, setOpen }) => {
  const theme = useTheme();
  const config = useSelector((state: RootState) => state.config);
  const handleButtonClick = () => {
    const link = document.createElement('a');
    link.href = config.surveyUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };
  return (
    <Dialog open={!!open} onClose={() => setOpen(false)} theme={theme}>
      <DialogContainer theme={theme}>
        <IconContainer flex={'10%'} alignSelf={'flex-end'}>
          <IconButton onClick={() => setOpen(false)} sx={{ ml: 2 }}>
            <img src={CloseIcon} style={{ padding: 0 }} />
          </IconButton>
        </IconContainer>
        <ImageContainer>
          <img src={icon} width={'100px'} height={'100px'} />
        </ImageContainer>
        <ContentContainer>
          <Box sx={{ justifyItems: 'center' }}>
            <Header>{i18next.t('survey.header')}</Header>
            <Header>{i18next.t('survey.header2')}</Header>
          </Box>
          <SubHeader>{i18next.t('survey.subHeader')}</SubHeader>
        </ContentContainer>
        <ButtonContainer>
          <SaveButton value={i18next.t(`survey.btn`)} onClick={() => handleButtonClick()} disabled={false} />
        </ButtonContainer>
      </DialogContainer>
    </Dialog>
  );
};
