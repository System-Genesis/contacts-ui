import { Box } from '@mui/material';
import { TagChip } from './Chip';

export const ContactTags = ({ tags, isEdit = false }: { tags: string[]; isEdit?: boolean }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      {tags.map((tag) => (
        <TagChip value={tag} isEdit={isEdit} />
      ))}
    </Box>
  );
};
