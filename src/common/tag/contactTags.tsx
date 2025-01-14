import { Autocomplete, Box, Chip, Grid, ListItemButton, TextField, Typography, useTheme } from '@mui/material';
import { TagChip } from './chip';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTags, searchTags } from '../../services/tagService';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from '@uidotdev/usehooks';
import add from '../../assets/icons/add.svg';
import { styledScrollY } from '../../css/common';

export const ContactTags = ({
  tags = [],
  isEdit = false,
  shrunkSize = -1,
  setFormData,
  sx = {},
  defaultTags = [],
}: {
  tags: { name: string; _id?: string }[];
  isEdit?: boolean;
  shrunkSize?: number;
  setFormData?: any;
  sx?: any;
  field?: string;
  defaultTags?: string[];
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(tags.length >= 15);
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
    setIsError(selectedTags.length >= 15);
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
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase()));

  const displayOptions =
    search.length >= 2 && !totalOptions.find((option) => option.name === search)
      ? [{ name: search }, ...filteredOptions]
      : filteredOptions;

  if (shrunkSize != -1) {
    const allTags = [...defaultTags.map((t) => ({ name: t, _id: t })), ...selectedTags];
    return (
      <Box display={'flex'} gap={0.5}>
        {allTags.slice(0, shrunkSize).map(({ name, _id }) => name && <TagChip value={name} id={_id} key={_id} />)}
        {allTags.length > shrunkSize && (
          <Chip
            key={`${allTags.length - shrunkSize}+`}
            component={'div'}
            label={`${allTags.length - shrunkSize}+`}
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
      </Box>
    );
  }
  return (
    <Grid container>
      {isEdit && (
        <Grid container mb={0}>
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
          ...(isEdit && { minHeight: '3vh' }),
          maxHeight: '6vh',
          alignItems: 'flex-start',
          ...styledScrollY(theme),
          gap: 0.75,
          flexWrap: 'wrap',
          ...sx,
        }}
      >
        {isEdit && (
          <Autocomplete
            multiple
            id="tags-filled"
            noOptionsText={isError ? i18next.t('validationError.tags') : i18next.t('whatsDescribesYou')}
            options={isError ? [] : displayOptions}
            open={isAutoCompleteOpen}
            onClose={() => {
              setIsAutoCompleteOpen(false);
              setSearch('');
            }}
            filterOptions={(x) => x}
            filterSelectedOptions
            sx={{
              borderRadius: '40px',
              backgroundColor: theme.colors.gray,
              height: 0,
              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.aqua,
              },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.aqua },
              '& .MuiOutlinedInput-root': { borderRadius: '40px', backgroundColor: theme.colors.gray },

              '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': { pr: 0 },
              '& .MuiAutocomplete-popupIndicator': { display: 'none' },
              '& .MuiInputBase-input': { height: 0 },
            }}
            value={selectedTags}
            onChange={(_event, newValue) =>
              newValue.length === 0 || isError ? setSearch('') : setSelectedTags(newValue as [])
            }
            getOptionLabel={(option) => option.name}
            renderTags={() => <></>}
            renderOption={(props, option: any) => (
              <ListItemButton
                {...props}
                style={{ justifyContent: 'space-between' }}
                disabled={isError || selectedTags.map((tag: any) => tag.name).includes(option.name)}
              >
                <Typography variant="body2" color="textSecondary">
                  {option._id ? option.name : i18next.t('newTagText') + option.name}{' '}
                </Typography>

                {!isError && !selectedTags.map((tag: any) => tag.name).includes(option.name) && (
                  <img src={add} width={12} style={{ padding: 0 }} />
                )}
              </ListItemButton>
            )}
            renderInput={(params) =>
              isAutoCompleteOpen ? (
                <TextField
                  value={search}
                  variant="outlined"
                  autoFocus
                  onChange={(e) => e.target.value.length <= 20 && setSearch(e.target.value)}
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
                  onKeyDown={(event) =>
                    (event.key === 'Escape' || event.key === 'Backspace') && event.stopPropagation()
                  }
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
                    backgroundColor: theme.colors.green,
                    fontSize: 13,
                    '&:hover': {
                      backgroundColor: theme.colors.green,
                      color: theme.colors.white,
                    },
                    '& .MuiChip-deleteIcon': {
                      '&:hover': {
                        backgroundColor: theme.colors.green,
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
        {defaultTags.map((t, i) => (
          <TagChip value={t} id={`${t}-${i}`} key={t} />
        ))}
        {selectedTags
          .map(
            ({ name, _id }, index) =>
              name && (
                <TagChip
                  value={name}
                  id={_id}
                  key={_id ?? `${name}-${index}`}
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
