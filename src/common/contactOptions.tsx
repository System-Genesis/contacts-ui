import { Box } from '@mui/material';
import outlook from '../assets/icons/outlook.svg';
import jabber from '../assets/icons/jabber.svg';
import hiChat from '../assets/icons/hiChat.svg';
import { ContactMenu, Option } from './contactMenu';
import i18next from 'i18next';

export const ContactOptions = ({
  mails,
  chats,
  jabberPhone,
  isGroup = false,
}: {
  jabberPhone: string; //TODO: fix to git the contact menu
  chats: Option[];
  mails: Option[];
  isGroup?: boolean;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        minHeight: '2.5rem',
      }}
    >
      {!isGroup && (
        <ContactMenu
          title={i18next.t('hiChat')}
          icon={hiChat}
          options={chats}
          href="https://hi.prod.services.idf/direct/"
        />
      )}
      <ContactMenu title={i18next.t('jabber')} icon={jabber} options={jabberPhone ? [jabberPhone] : []} href="sip:" />
      <ContactMenu title={i18next.t('outlook')} icon={outlook} options={mails} href="mailto:" />
    </Box>
  );
};
