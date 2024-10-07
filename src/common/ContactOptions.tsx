import { Box, IconButton } from '@mui/material';
import outlook from '../assets/icons/outlook.svg';
import jabber from '../assets/icons/jabber.svg';
import hiChat from '../assets/icons/hiChat.svg';
import { ContactMenu } from './ContactMenu';

export const ContactOptions = ({
  mails,
  chats,
  jabberPhone,
}: {
  jabberPhone?: string;
  chats: string[];
  mails: string[];
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'row',
        gap: 1,
        alignItems: 'center',
        padding: 1,
      }}
    >
      <ContactMenu icon={hiChat} options={chats} href="https://hi.prod.services.idf/direct/" />

      {jabberPhone && (
        <IconButton href={`sip:${jabberPhone[0]}`}>
          <img src={jabber} />
        </IconButton>
      )}

      <ContactMenu icon={outlook} options={mails} href="mailto:" />
    </Box>
  );
};
