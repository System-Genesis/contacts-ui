import { Chip, styled, useTheme } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const ChipStyled = styled(Chip)(({ theme }) => ({
  cursor: 'default',
  minWidth: '60px',
  padding: '0.25rem 0.5rem',
  borderRadius: '40px',
  backgroundColor: theme.colors.gray,
  fontSize: 13,
}));

export const TagChip = ({ value, isEdit }: { value: string; isEdit: boolean }) => {
  const theme = useTheme();
  const handleDelete = () => {
    console.log('deleted {', value, '} chip');
  };

  return isEdit ? (
    <ChipStyled
      key={id}
      theme={theme}
      label={value}
      deleteIcon={<CloseRoundedIcon />}
      onDelete={handleDelete}
      size="small"
    />
  ) : (
    <ChipStyled key={id} theme={theme} label={value} size="small" />
  );
};
