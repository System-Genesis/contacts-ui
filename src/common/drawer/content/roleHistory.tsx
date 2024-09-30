import { Box, useTheme } from '@mui/material';
import { RoleHistoryAccordionCard } from '../../../pages/profile/card/accordionCard/roleHistoryAccordion';
import { RoleHistory } from '../../../lib/types';

export const RoleHistoryContent: React.FC<{
  roleHistoryList: Partial<RoleHistory>[];
}> = ({ roleHistoryList }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: theme.spacing(2) }}>
      {roleHistoryList.map((roleHistory, index) => (
        <RoleHistoryAccordionCard key={index} roleHistory={roleHistory} />
      ))}
    </Box>
  );
};
