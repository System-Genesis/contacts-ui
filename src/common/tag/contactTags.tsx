import { Autocomplete, Box, Chip, Grid, TextField, Typography, useTheme } from '@mui/material';
import { TagChip } from './chip';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTags, searchTags } from '../../services/tagService';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from '@uidotdev/usehooks';

export const ContactTags = ({
  tags,
  isEdit = false,
  shrunk = false,
  setFormData,
  sx = {},
}: {
  tags: { name: string; _id?: string }[];
  isEdit?: boolean;
  shrunk?: boolean;
  setFormData?: any;
  sx?: any;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [debounced] = useDebounce(search, 2000);
  const [selectedTags, setSelectedTags] = useState(tags);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

  const { data: firstTags } = useQuery({
    queryKey: [getTags.name],
    initialData: [],
    queryFn: getTags,
    enabled: isEdit,
  });

  useEffect(() => {
    if (setFormData) setFormData((prev: any) => ({ ...prev, tags: selectedTags }));
  }, [selectedTags]);

  useEffect(() => {
    if (!isEdit) {
      setIsAutoCompleteOpen(false);
      setSelectedTags(tags); //TODO: fix this
    }
  }, [isEdit]);

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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 1,
          p: 0,
        }}
      >
        {!shrunk ? (
          <Box display={'flex'} width={'100%'}>
            <Box
              sx={{
                flex: 'auto',
                maxWidth: !isAutoCompleteOpen ? '100%' : '60%',
                maxHeight: '5.5vh',
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
                ...sx,
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
                      onDelete={() => setSelectedTags(selectedTags.filter((tag: any) => tag.name != name))}
                    />
                  ),
              )}
            </Box>
            {isEdit &&
              (isAutoCompleteOpen ? (
                <Autocomplete
                  multiple
                  id="tags-filled"
                  noOptionsText={'אין תוצאות'}
                  options={displayOptions}
                  sx={{
                    width: '10vw',
                    borderRadius: '40px',
                    backgroundColor: theme.colors.gray,
                    height: 0,
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
                      height: 0,
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
                      InputProps={params.InputProps}
                    />
                  )}
                />
              ) : (
                <Chip
                  component={'div'}
                  label={i18next.t('newTag')}
                  size="small"
                  onClick={() => setIsAutoCompleteOpen(true)}
                  onDelete={() => setIsAutoCompleteOpen(true)}
                  deleteIcon={<AddIcon />}
                  sx={{
                    cursor: 'pointer',
                    alignSelf: 'center',
                    direction: 'ltr',
                    color: theme.colors.white,
                    borderRadius: '40px',
                    backgroundColor: '#295C54',
                    fontSize: 13,
                    '&:hover': {
                      backgroundColor: '#295C54',
                      color: theme.colors.white,
                    },
                    '& .MuiChip-deleteIcon': {
                      color: theme.colors.white,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#295C54',
                        color: theme.colors.white,
                      },
                    },
                  }}
                />
              ))}
          </Box>
        ) : (
          <Grid>
            {selectedTags.slice(0, 1).map(({ name, _id }) => name && <TagChip value={name} id={_id} key={_id} />)}
            {selectedTags.length > 1 && (
              <Chip
                key={`${selectedTags.length - 1}+`}
                component={'div'}
                label={`${selectedTags.length - 1}+`}
                size="small"
                sx={{
                  cursor: 'default',
                  direction: 'ltr',
                  borderRadius: '40px',
                  backgroundColor: theme.colors.gray,
                  fontSize: 13,
                }}
              />
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
