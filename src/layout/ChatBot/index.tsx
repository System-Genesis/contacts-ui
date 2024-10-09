import { Fab, useTheme } from '@mui/material';
import chatBotSrc from '../../assets/icons/ChatBot.svg';

export default function ChatBot() {
  const theme = useTheme();

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
    >
      <img src={chatBotSrc} alt="Chatbot Icon" />
    </Fab>
  );
}
