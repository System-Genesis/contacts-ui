import { Fab, useTheme } from '@mui/material';
import chatBotSrc from '../../assets/icons/ChatBot.svg';

export default function ChatBot() {
  const theme = useTheme();

  const onClick = () => console.log('bot');
  return (
    <Fab
      aria-label="chatbot"
      size="large"
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
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
