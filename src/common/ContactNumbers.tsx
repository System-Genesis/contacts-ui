import { Box } from '@mui/material';
import { ContactNumber } from './ContactNumber';

export const ContactNumbers = ({
  jabberPhone,
  mobilePhone,
  isGroup = false,
}: {
  jabberPhone?: string;
  mobilePhone?: string;
  isGroup?: boolean;
}) => {
  return (
    <Box display={'flex'} gap={2} justifyContent={isGroup ? 'right' : 'center'}>
      {!isGroup && <ContactNumber type="mobile" value={mobilePhone} isHidden={true} />}
      <ContactNumber type="jabber" value={jabberPhone} isHidden={false} />

      {/* {!isGroup && mobilePhone && <ContactNumber type="mobile" value={mobilePhone} isHidden={true} />} */}
      {/* {jabberPhone && <ContactNumber type="jabber" value={jabberPhone} isHidden={false} />} */}
    </Box>
  );
};
