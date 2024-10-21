import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ChipStyled } from './Chip';
import { useState } from 'react';

export const AddTagChip = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleAdd = () => {
    console.log('add ne  w chip');
  };

  // return selected ? :

  return <ChipStyled label="תגית חדשה" deleteIcon={<AddRoundedIcon />} onDelete={handleAdd} size="small" />;
};
