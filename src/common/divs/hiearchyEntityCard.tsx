import { Box, Typography } from '@mui/material';
import { CustomChip } from './chip';
import i18next from 'i18next';

export const HierarchyEntityCard = ({ entity, groupId, onClick }: { entity: any; groupId: string; onClick: any }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ borderRadius: '50%', backgroundColor: 'green', flex: 1 }}></Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
            {entity.fullName}
          </Typography>
          <CustomChip
            label={entity.jobTitle}
            style={{ backgroundColor: '#EDF7F4', color: '#295C54', marginTop: 6, fontSize: '16px' }}
          />
        </Box>
        {entity.commanderOf.includes(groupId) && (
          <Typography variant="subtitle1" sx={{ fontSize: '12px', flex: 1 }}>
            {i18next.t('hierarchyCommander')}
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 1 }}></Box>
    </Box>
  );
};
