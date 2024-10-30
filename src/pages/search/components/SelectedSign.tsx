export const SelectedSign = ({ isSelected, theme }) => {
  return (
    <div
      style={{
        marginLeft: '0.5rem',
        right: -12,
        width: '3px',
        height: '83%',
        backgroundColor: isSelected ? theme.colors.darkAqua : 'transparent',
        borderRadius: '30px',
        zIndex: 15,
        placeSelf: 'center',
      }}
    />
  );
};
