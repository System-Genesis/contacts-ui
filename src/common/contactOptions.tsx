import { Box } from '@mui/material';
import outlook from '../assets/icons/outlook.svg';
import jabber from '../assets/icons/jabber.svg';
import hiChat from '../assets/icons/hiChat.svg';
import { ContactMenu, Option } from './contactMenu';
import i18next from 'i18next';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

export const ContactOptions = ({
  mails,
  chats,
  jabberPhone,
  isGroup = false,
  hiddenFields,
}: {
  jabberPhone: Option[];
  chats: Option[];
  mails: Option[];
  isGroup?: boolean;
  hiddenFields: string[];
}) => {
  const config = useSelector((state: RootState) => state.config);
  const currentUser = useSelector((state: RootState) => state.user);

  const jabberPhoneWithPrefix = jabberPhone.map((o) => {
    if (currentUser.source === 'Souf' && o.source !== 'Souf') return { ...o, option: `70-${o.option}` };
    if (currentUser.source !== 'Souf' && o.source === 'Souf') return { ...o, option: `81-${o.option}` };
    return o;
  });
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
      {!isGroup && <ContactMenu title={i18next.t('hiChat')} icon={hiChat} options={chats} href={config.hiChatUrl} />}
      <ContactMenu
        title={i18next.t('jabber')}
        icon={jabber}
        options={jabberPhoneWithPrefix}
        href="sip:"
        disabled={hiddenFields?.includes('jabberPhone')}
      />
      <ContactMenu title={i18next.t('outlook')} icon={outlook} options={mails} href="mailto:" />
    </Box>
  );
};
