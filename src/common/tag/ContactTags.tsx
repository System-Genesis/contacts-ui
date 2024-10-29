import { Grid, Typography, useTheme } from '@mui/material';
import { TagChip } from './Chip';
import i18next from 'i18next';
import { AddTag } from './AddTagChip';

export const ContactTags = ({ tags, isEdit = false }: { tags: { name: string; _id: string }[]; isEdit?: boolean }) => {
  const theme = useTheme();

  return (
    <Grid container>
      {isEdit && (
        <Grid container mb={1}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.darkGray,
            }}
          >
            {i18next.t(`tagsTitle`)}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 300,
              color: theme.colors.lightGray,
            }}
          >
            {i18next.t(`tagsExplain`)}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        sx={{
          display: 'flex',
          gap: 1,
          mt: 0.5,
        }}
      >
        {tags.map(({ name, _id }) => (
          <TagChip value={name} id={_id} key={_id} isEdit={isEdit} />
        ))}

        {isEdit && <AddTag />}
      </Grid>
    </Grid>
  );
};
