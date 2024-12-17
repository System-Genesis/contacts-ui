import { Box, Dialog, IconButton, Typography, useTheme } from '@mui/material';
import ErrorDialog from '../../assets/images/errorDialog.svg';
import CloseIcon from '../../assets/icons/close.svg';
import i18next from 'i18next';
import { CancelButton } from '../buttons/cancel';
import { SaveButton } from '../buttons/save';

export const ChatBotDialog: React.FC<{
  open: boolean;
  onSave: any;
  onCancel: any;
  setOpen: (val) => void;
}> = ({ open, setOpen, onSave, onCancel }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={!!open}
      onClose={onCancel}
      sx={{
        '& .MuiDialog-paper': {
          width: '20vw',
          height: '45vh',
          margin: 'auto',
          borderRadius: '20px',
          pb: 1,
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #D8EFE8 65%, white 35%)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 2,
          alignItems: 'center',
        }}
      >
        <Box flex={'10%'} alignSelf={'flex-end'}>
          <IconButton onClick={() => setOpen(false)} sx={{ ml: 2 }}>
            <img src={CloseIcon} style={{ padding: 0 }} />
          </IconButton>
        </Box>
        <Box flex={'50%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={ErrorDialog} width={'100px'} height={'100px'} />
        </Box>
        <Box
          flex={'40%'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: theme.spacing(3),
          }}
        >
          <Box>
            <Typography variant={'body1'} fontSize={20} color={'#223F3B'} fontWeight={'bold'}>
              {i18next.t('chatBotDialog.wereHereToHelp')}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={14} color={'#656565'} textAlign={'center'}>
              {i18next.t('chatBotDialog.haveAProblem')}
            </Typography>
            <Typography fontSize={14} color={'#656565'} textAlign={'center'}>
              {i18next.t('chatBotDialog.weWouldLikeToHelp')}
            </Typography>
          </Box>
        </Box>
        <Box flex={'10%'} sx={{ display: 'flex', justifyContent: 'center', columnGap: 2 }}>
          <CancelButton value={i18next.t(`chatBotDialog.noThankYou`)} onClick={onCancel} />
          <SaveButton value={i18next.t(`chatBotDialog.openIssue`)} onClick={onSave} disabled={false} />
        </Box>
      </Box>
    </Dialog>
  );
};
