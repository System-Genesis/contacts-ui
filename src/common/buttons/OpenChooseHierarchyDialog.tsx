import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import ViewHierarchies from '@mui/icons-material/ViewAgendaOutlined';
import { useTheme } from '@mui/material/styles';

const ChooseHierarchyButton = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={() => {
        setOpen(true);
      }}
    >
      <ViewHierarchies sx={{ color: theme.colors.table.title }} />
    </IconButton>
  );
};

export default ChooseHierarchyButton;
