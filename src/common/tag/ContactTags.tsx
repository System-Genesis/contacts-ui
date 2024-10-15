import { Box } from '@mui/material';
import { TagChip } from './Chip';

export const ContactTags = ({ tags, isEdit = false }: { tags: { name: string; _id: string }[]; isEdit?: boolean }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      {tags.map(({ name, _id }) => (
        <TagChip value={name} id={_id} isEdit={isEdit} />
      ))}
    </Box>
  );
};
