import { Box } from '@mui/material';
import outlook from '../assets/icons/outlook.svg';
import jabber from '../assets/icons/jabber.svg';
import hiChat from '../assets/icons/hiChat.svg';
import { ContactMenu } from './ContactMenu';

export const ContactOptions = ({
  mails,
  chats,
  jabberPhone,
  withHi = true,
}: {
  jabberPhone: string;
  chats: string[];
  mails: string[];
  withHi?: boolean;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {withHi && <ContactMenu icon={hiChat} options={chats} href="https://hi.prod.services.idf/direct/" />}
      <ContactMenu icon={jabber} options={jabberPhone ? [jabberPhone] : []} href="sip:" />
      <ContactMenu icon={outlook} options={mails} href="mailto:" />
    </Box>
  );
};
