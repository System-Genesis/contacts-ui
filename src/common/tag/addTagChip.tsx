import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Chip, styled, TextField, useAutocomplete, useTheme } from '@mui/material';
import { useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
export const ChipStyled = styled(Chip)(({ theme }) => ({
  cursor: 'pointer',
  minWidth: '60px',
  padding: '0.25rem 0.5rem',
  borderRadius: '40px',
  backgroundColor: theme.colors.green,
  fontSize: 13,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.colors.subTitle,
  },
  '& .MuiChip-deleteIcon, .MuiChip-deleteIcon:hover': {
    color: theme.colors.white, // Or theme.colors.white if defined in your theme
  },
}));

export const TexTFieldStyled = styled(TextField)(({ theme }) => ({
  cursor: 'pointer',
  minWidth: '60px',
  padding: '0.25rem 0.5rem',
  borderRadius: '40px',
  backgroundColor: theme.colors.green,
  fontSize: 13,
  color: 'white',
  '& .MuiChip-deleteIcon, .MuiChip-deleteIcon:hover': {
    color: theme.palette.common.white, // Or theme.colors.white if defined in your theme
  },
}));

const AddTagChip = ({ setOnAdd }) => {
  const theme = useTheme();

  return (
    <ChipStyled
      theme={theme}
      label="תגית חדשה"
      deleteIcon={<AddRoundedIcon sx={{ color: theme.colors.white }} />}
      onDelete={() => setOnAdd(true)}
      size="small"
      onClick={() => setOnAdd(true)}
    />
  );
};

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: '#fff',
  color: '#000',
  ...theme.applyStyles('dark', {
    backgroundColor: '#000',
    color: '#fff',
  }),
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: '#fff',
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: '#000',
  }),
}));

export const UseAutocomplete = (setOnAdd) => {
  const theme = useTheme();

  const { getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: [{ title: 'sss' }, { title: 'ss' }, { title: 's' }],
    getOptionLabel: (option) => option.title,
  });

  return (
    <div>
      <div>
        <Input
          {...getInputProps()}
          sx={{
            borderRadius: '30px',
            border: '1px solid ',
            borderColor: theme.colors.aquaDark,
          }}
        />
        <ClearRoundedIcon />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                {option.title}
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </div>
  );
};

export const AddTag = () => {
  const [onAdd, setOnAdd] = useState<boolean>(false);

  return onAdd ? (
    <UseAutocomplete setOnAdd={setOnAdd}></UseAutocomplete>
  ) : (
    <AddTagChip setOnAdd={setOnAdd}></AddTagChip>
  );
};
