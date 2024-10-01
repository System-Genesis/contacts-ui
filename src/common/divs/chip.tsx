import { Chip as MuiChip } from '@mui/material';
interface Props {
  label: string;
  onClick?: ((event: any) => void) | undefined;
  onDelete?: ((event: any) => void) | undefined;
  icon?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export const CustomChip = ({ label, onDelete, style, icon, onClick }: Props) => {
  return (
    <MuiChip
      onDelete={(e) => onDelete?.(e)}
      onClick={(e) => onClick?.(e)}
      label={label}
      deleteIcon={<img src={icon} />}
      style={{ ...(style ?? {}), borderRadius: '30px' }}
    />
  );
};
