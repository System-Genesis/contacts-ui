import { Grid, IconButton, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const StyledDrawerWrapper = styled(SwipeableDrawer)({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiDrawer-paper': {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '480px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    boxShadow: `
    30px 0px 65px 0px #383F511F,
    118px 0px 118px 0px #383F511C,
    266px 0px 159px 0px #383F510F,
    472px 0px 189px 0px #383F5103,
    738px 0px 207px 0px #383F5100`,
  },
});

export const DrawerWrapper: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
  onClose?: () => void;
  children: any;
}> = ({ children, isOpen, setIsOpen, onClose }) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <StyledDrawerWrapper
      anchor="right"
      open={isOpen}
      elevation={2}
      onOpen={() => setIsOpen(true)}
      onClose={onClose ?? (() => setIsOpen(true))}
      PaperProps={{ sx: { borderRadius: '20px 0px 0px 20px', padding: theme.spacing(0) } }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(2),
          px: 3,
          py: 2,
          height: '100%',
        }}
      >
        <Grid
          container
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <IconButton onClick={() => setIsEdit((prev) => !prev)}>
            <img src={EditIcon} />
          </IconButton>
          <IconButton onClick={onClose}>
            <img src={CloseIcon} />
          </IconButton>
        </Grid>
        <Grid container>{children({ isEdit, setIsEdit, message: 'niga' })}</Grid>
      </Grid>
    </StyledDrawerWrapper>
  );
};
