import { Box } from '@mui/material';
import { ContactNumber } from './contactNumber';

export const ContactNumbers = ({
  mobilePhone = '050-000000',
  jabberPhone = '6000000',
  isGroup = false,
}: {
  jabberPhone?: string;
  mobilePhone?: string;
  isGroup?: boolean;
}) => {
  return (
    <Box display={'flex'} gap={2} minHeight="1rem" justifyContent={isGroup ? 'right' : 'center'}>
      {!isGroup && mobilePhone && <ContactNumber type="mobile" value={mobilePhone} isHidden={Math.random() > 0.5} />}
      {jabberPhone && <ContactNumber type="jabber" value={jabberPhone} isHidden={false} />}
    </Box>
  );
};
