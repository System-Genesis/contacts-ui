import { Fab, useTheme } from '@mui/material';
import chatBotSrc from '../../assets/icons/ChatBot.svg';
import { useState } from 'react';
import { ChatBotDialog } from '../../common/dialogs/chatBot';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EinavSupportDialog } from '../../common/dialogs/SupportEinav';

export const ChatBot = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const config = useSelector((state: RootState) => state.config);

  return (
    <Fab
      aria-label="chatbot"
      size="large"
      sx={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '2.56rem',
        background: theme.colors.aqua,
        ':hover': {
          background: theme.colors.aquaDark,
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        setDialogOpen(true);
      }}
    >
      <img src={chatBotSrc} alt="Chatbot Icon" />
      <EinavSupportDialog
        // <ChatBotDialog
        open={dialogOpen}
        onCancel={(e) => {
          e.stopPropagation();
          setDialogOpen(false);
        }}
        onSave={(e) => {
          e.stopPropagation();
          setDialogOpen(false);
          window.open(`${config.serviceNowUrl}`);
        }}
      />
    </Fab>
  );
};
