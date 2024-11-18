import { Chip, styled, useTheme } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const ChipStyled = styled(Chip)(({ theme }) => ({
  cursor: 'default',
  minWidth: '60px',
  padding: '0.25rem 0.5rem',
  direction: 'ltr',
  borderRadius: '40px',
  backgroundColor: theme.colors.gray,
  fontSize: 13,
}));

export const TagChip = ({
  id,
  value,
  isEdit = false,
  onDelete,
}: {
  id?: string | undefined;
  value: string;
  isEdit?: boolean;
  onDelete?: any;
}) => {
  const theme = useTheme();

  return isEdit ? (
    <ChipStyled
      key={id ?? value}
      theme={theme}
      label={value}
      deleteIcon={<CloseRoundedIcon />}
      onDelete={onDelete}
      size="small"
    />
  ) : (
    <ChipStyled key={id} theme={theme} label={value} size="small" />
  );
};
