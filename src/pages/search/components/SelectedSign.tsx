export const SelectedSign = ({ isSelected, theme, sx = {} }) => {
  return (
    <div
      style={{
        marginLeft: '0.5rem',
        right: -12,
        width: '3px',
        height: '83%',
        backgroundColor: isSelected ? theme.colors.darkAqua : 'transparent',
        borderRadius: '30px',
        placeSelf: 'center',
        ...sx,
        transition: 'background-color 0.3s',
      }}
    />
  );
};
