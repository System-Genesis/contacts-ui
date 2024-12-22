import { Autocomplete, Box, Chip, Grid, TextField, Typography, useTheme } from '@mui/material';
import { TagChip } from './chip';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTags, searchTags } from '../../services/tagService';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from '@uidotdev/usehooks';
import add from '../../assets/icons/add.svg';

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

  if (shrunk)
    return (
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
    );

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

      <Box
        sx={{
          display: 'flex',
          minHeight: selectedTags.length ? '3vh' : '0',
          maxHeight: '6vh',
          alignItems: 'flex-start',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '0.5rem' },
          '&::-webkit-scrollbar-track': {
            background: theme.colors.gray,
            borderRadius: '100px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.aquaLight,
            borderRadius: '10px',
            border: `2px solid ${theme.colors.gray}`,
          },
          '&::-webkit-scrollbar-thumb:hover, &::-webkit-scrollbar-thumb:focus': {
            backgroundColor: theme.colors.aquaLightGray,
          },
          gap: 0.75,
          flexWrap: 'wrap',
          ...sx,
        }}
      >
        {isEdit && (
          <Autocomplete
            multiple
            id="tags-filled"
            noOptionsText={'מה מתאר אותך?'}
            options={displayOptions}
            open={isAutoCompleteOpen} // Controls dropdown visibility
            onClose={() => setIsAutoCompleteOpen(false)}
            filterOptions={(x) => x} // Prevents default filtering
            filterSelectedOptions
            sx={{
              borderRadius: '40px',
              backgroundColor: theme.colors.gray,
              height: 0,
              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.aqua,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.aqua,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '40px',
                backgroundColor: theme.colors.gray,
              },

              '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
                pr: 0,
              },
              '& .MuiAutocomplete-popupIndicator': {
                display: 'none',
              },
              '& .MuiInputBase-input': {
                height: 0,
              },
            }}
            value={selectedTags}
            onChange={(_event, newValue) => (newValue.length === 0 ? setSearch('') : setSelectedTags(newValue as []))}
            getOptionLabel={(option) => option.name}
            renderTags={() => <></>}
            renderOption={(props, option: any) => (
              <li {...props} key={option.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  {option._id ? option.name : `תגית חדשה: ` + option.name}
                </Typography>
                <img src={add} width={12} style={{ padding: 0 }} />
              </li>
            )}
            renderInput={(params) =>
              isAutoCompleteOpen ? (
                <TextField
                  value={search}
                  variant="outlined"
                  autoFocus
                  onChange={(e) => e.target.value.length <= 5 && setSearch(e.target.value)}
                  {...params}
                  InputProps={params.InputProps}
                  sx={{
                    width: '10rem',
                    border: 'none',
                    p: 0,
                    ['& .MuiOutlinedInput-root']: {
                      borderWidth: 1,
                      padding: 0,
                      pl: '0.5rem',
                      height: '1.5rem',
                    },
                  }}
                />
              ) : (
                <Chip
                  label={i18next.t('newTag')}
                  size="small"
                  onClick={() => setIsAutoCompleteOpen(true)}
                  onDelete={() => setIsAutoCompleteOpen(true)}
                  deleteIcon={<AddIcon />}
                  sx={{
                    cursor: 'pointer',
                    alignSelf: 'center',
                    color: theme.colors.white,
                    borderRadius: '40px',
                    backgroundColor: '#295C54',
                    fontSize: 13,
                    '&:hover': {
                      backgroundColor: '#295C54',
                      color: theme.colors.white,
                    },
                    '& .MuiChip-deleteIcon': {
                      '&:hover': {
                        backgroundColor: '#295C54',
                        color: theme.colors.white,
                      },
                      color: theme.colors.white,
                      cursor: 'pointer',
                    },
                  }}
                />
              )
            }
          />
        )}

        {selectedTags
          .map(
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
          )
          .reverse()}
      </Box>
    </Grid>
  );
};
