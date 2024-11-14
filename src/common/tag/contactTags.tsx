import { Autocomplete, Grid, TextField, Typography, useTheme } from '@mui/material';
import { TagChip } from './chip';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTags, searchTags } from '../../services/tagService';

export const ContactTags = ({
  tags,
  isEdit = false,
  shrinked = false,
  setFormData,
}: {
  tags: { name: string; _id: string }[];
  isEdit?: boolean;
  shrinked?: boolean;
  setFormData?: any;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [debounced] = useDebounce(search, 1000);
  const [selectedTags, setSelectedTags] = useState(tags); // State to hold selected tags

  const { data: firstTags } = useQuery({
    queryKey: [getTags.name],
    initialData: [],
    queryFn: getTags,
    enabled: isEdit,
  });

  useEffect(() => {
    if (setFormData) setFormData((prev: any) => ({ ...prev, tags: selectedTags }));
  }, [selectedTags, setFormData]);

  const { data: searchData } = useQuery({
    queryKey: [searchTags?.name, debounced],
    queryFn: () => searchTags?.(debounced),
    enabled: debounced?.length >= 2 && isEdit,
    placeholderData: keepPreviousData,
  });

  const options = (search.length === 0 ? firstTags : searchData) ?? firstTags;
  const totalOptions = [...options, ...selectedTags];
  const filteredOptions = options.filter((option) => !selectedTags.map((tag: any) => tag.name).includes(option.name));

  const displayOptions =
    search.length >= 2 && !totalOptions.find((option) => option.name === search)
      ? [{ name: search }, ...filteredOptions]
      : filteredOptions;

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
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mt: 0.5,
          p: 0,
        }}
      >
        {!shrinked ? (
          <Grid
            sx={{
              flex: 1,
              pl: 0.5,
              maxHeight: '6vh',
              overflowY: 'auto',
              direction: 'rtl',
              '&::-webkit-scrollbar': {
                width: '0.5rem',
              },
              '&::-webkit-scrollbar-track': {
                background: theme.colors.gray,
                borderRadius: '100px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.colors.aquaLight,
                borderRadius: '10px',
                border: `2px solid ${theme.colors.gray}`,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.colors.aquaLightGray,
              },
              display: 'flex',
              gap: 0.5,
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            {selectedTags.map(
              ({ name, _id }) =>
                name && (
                  <TagChip
                    value={name}
                    id={_id}
                    key={_id}
                    isEdit={isEdit}
                    onDelete={() => {
                      setSelectedTags(selectedTags.filter((tag: any) => tag.name != name));
                    }}
                  />
                ),
            )}
          </Grid>
        ) : (
          <Grid>
            {selectedTags
              .concat([
                { name: 'dsds', _id: 'dx' },
                { name: 'dsdds', _id: 'dx' }, //TODO: remove this
              ])
              .slice(0, 1)
              .map(({ name, _id }) => name && <TagChip value={name} id={_id} key={_id} />)}
            {selectedTags.concat([
              { name: 'dsds', _id: 'dx' },
              { name: 'dsdds', _id: 'dx' },
            ]).length > 1 && <TagChip value={`${selectedTags.length - 1} +`} />}
          </Grid>
        )}

        {isEdit && (
          <Autocomplete
            multiple
            id="tags-filled"
            noOptionsText={'אין תוצאות'}
            options={displayOptions}
            sx={{
              p: 0,
              width: '10vw',
              borderRadius: '40px',
              backgroundColor: theme.colors.gray,
              border: '1px solid',
              borderColor: theme.colors.gray,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.aqua,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '40px',
                backgroundColor: theme.colors.gray,
              },
              '& .MuiInputBase-input': {
                height: '0.3vh',
              },
            }}
            filterOptions={(x) => x}
            filterSelectedOptions
            value={selectedTags}
            onChange={(_event, newValue) => {
              if (newValue.length === 0) return setSearch('');
              setSelectedTags(newValue as []);
            }}
            getOptionLabel={(option) => option.name}
            renderTags={() => <></>}
            renderOption={(props, option: any) => (
              <li {...props} key={option.name}>
                <Typography variant="body2" color="textSecondary">
                  {option._id ? option.name : `תג חדש: ` + option.name}
                </Typography>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                {...params}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        )}
      </Grid>
    </Grid>
  );
};
