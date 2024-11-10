import { Autocomplete, Chip, Grid, TextField, Typography, useTheme } from '@mui/material';
import { TagChip } from './Chip';
import i18next from 'i18next';

export const ContactTags = ({ tags, isEdit = false }: { tags: { name: string; _id: string }[]; isEdit?: boolean }) => {
  const theme = useTheme();
  const tagsList = [
    { name: 'asdasd1', _id: '1' },
    { name: 'asdasd2', _id: '2' },
    { name: 'asdasd3', _id: '3' },
  ];

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
        {isEdit ? (
          <Autocomplete<string, true, true, true>
            multiple
            id="tags-filled"
            options={tagsList.map((t) => t.name)}
            sx={{ width: '100%' }}
            defaultValue={tagsList.map((t) => t.name)}
            freeSolo
            getOptionLabel={(option) => option}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
              })
            }
            renderInput={(params) => <TextField {...params} variant="standard" />}
          />
        ) : (
          tags.map(({ name, _id }) => <TagChip value={name} id={_id} key={_id} isEdit={isEdit} />)
        )}
      </Grid>
    </Grid>
  );
};
