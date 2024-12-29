export const styledScrollY = (theme) => ({
  overflowY: 'auto',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': { width: '0.6rem' },
  '&::-webkit-scrollbar-track': {
    background: theme.colors.gray,
    borderRadius: '100px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.aquaLight,
    borderRadius: '10px',
    border: `2px solid ${theme.colors.gray}`,
  },
  '&::-webkit-scrollbar-thumb:hover, &::-webkit-scrollbar-thumb:focus': {
    backgroundColor: theme.colors.aquaLightGray,
  },
});
