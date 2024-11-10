import { Box } from '@mui/material';
import { ContactNumber } from './ContactNumber';

export const ContactNumbers = ({
  mobilePhone = undefined,
  jabberPhone = undefined,
  isGroup = false,
  hiddenFields = [],
}: {
  jabberPhone?: string;
  mobilePhone?: string;
  isGroup?: boolean;
  hiddenFields?: string[];
}) => {
  return (
    <Box display={'flex'} gap={2} minHeight="1rem" justifyContent={isGroup ? 'right' : 'center'}>
      {!isGroup && mobilePhone && (
        <ContactNumber type="mobile" value={mobilePhone} isHidden={hiddenFields.includes('mobilePhone')} />
      )}
      {jabberPhone && (
        <ContactNumber type="jabber" value={jabberPhone} isHidden={hiddenFields.includes('jabberPhone')} />
      )}
    </Box>
  );
};
