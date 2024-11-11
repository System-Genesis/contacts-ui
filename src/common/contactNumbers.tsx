import { Box } from '@mui/material';
import { ContactNumber } from './contactNumber';

export const ContactNumbers = ({
  mobilePhone = undefined,
  redPhone = undefined,
  isGroup = false,
  hiddenFields = [],
}: {
  redPhone?: string;
  mobilePhone?: string;
  isGroup?: boolean;
  hiddenFields?: string[];
}) => {
  return (
    <Box display={'flex'} gap={2} minHeight="1rem" justifyContent={isGroup ? 'right' : 'center'}>
      {!isGroup && mobilePhone && (
        <ContactNumber
          type="mobile"
          value={mobilePhone.replace(/\D/g, '').replace(/(\d{3})(\d{7})/, '$1-$2')}
          isHidden={hiddenFields.includes('mobilePhone')}
        />
      )}
      {redPhone && <ContactNumber type="red" value={redPhone} isHidden={hiddenFields.includes('redPhone')} />}
    </Box>
  );
};
