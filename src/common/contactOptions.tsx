import { Box } from '@mui/material';
import outlook from '../assets/icons/outlook.svg';
import jabber from '../assets/icons/jabber.svg';
import hiChat from '../assets/icons/hiChat.svg';
import { ContactMenu } from './contactMenu';
import i18next from 'i18next';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Option } from '../lib/types';
import { clickedShortcut } from '../matomo/actions';

export const ContactOptions = ({
  mails,
  chats,
  jabberPhones,
  isGroup = false,
  hiddenFields,
  location,
}: {
  jabberPhones: Option[];
  chats: Option[];
  mails: Option[];
  isGroup?: boolean;
  hiddenFields: string[];
  location: 'favorite' | 'drawer' | 'searchRes';
}) => {
  const config = useSelector((state: RootState) => state.config);
  const currentUser = useSelector((state: RootState) => state.user);

  const jabberPhoneWithPrefix = jabberPhones
    ?.filter((o) => o.option)
    .map((o) => {
      if (currentUser.source === 'Souf' && o.source !== 'Souf') return { ...o, option: `80${o.option}` };
      if (currentUser.source !== 'Souf' && o.source === 'Souf') return { ...o, option: `81${o.option}` };
      return o;
    }); //TODO: remove
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
          href={config.hiChatUrl}
          onClick={() => clickedShortcut('hichat', location)}
        />
      )}
      <ContactMenu
        title={i18next.t('jabber')}
        icon={jabber}
        options={jabberPhoneWithPrefix}
        href="sip:"
        disabled={hiddenFields?.includes('jabberPhones')}
        onClick={() => clickedShortcut('jabber', location)}
      />
      <ContactMenu
        title={i18next.t('outlook')}
        icon={outlook}
        options={mails}
        href="mailto:"
        onClick={() => clickedShortcut('outlook', location)}
      />
    </Box>
  );
};
