import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ChipStyled } from './Chip';
import { useState } from 'react';

export const TagChip = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleAdd = () => {
    console.log('add ne  w chip');
  };

  return selected ? :
  
  
  <ChipStyled label="תגית חדשה" deleteIcon={<AddRoundedIcon />} onDelete={handleAdd} size="small" />;
};
