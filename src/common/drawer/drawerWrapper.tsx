import { Box, IconButton, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useTheme } from '@mui/material';
import { useState } from 'react';

interface StyledDrawerProps {
  openToRight?: boolean;
}

const StyledDrawerWrapper = styled(SwipeableDrawer, {
  shouldForwardProp: (prop) => prop !== 'openToRight',
})<StyledDrawerProps>(({ openToRight = false }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiDrawer-paper': {
    position: 'absolute',
    top: 0,
    right: openToRight ? 555 : 0,
    height: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
}));

export const DrawerWrapper: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
  onClose?: () => void;
  children: any;
  width: string;
}> = ({ children, isOpen, setIsOpen, onClose, width }) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <StyledDrawerWrapper
      anchor="right"
      open={isOpen}
      elevation={2}
      onOpen={() => setIsOpen(true)}
      onClose={onClose ?? (() => setIsOpen(false))}
      PaperProps={{ sx: { borderRadius: '12px 0px 0px 12px' } }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(2),
          p: 3,
          height: '100%',
          width: width,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconButton onClick={() => setIsEdit(true)}>
            <img src={EditIcon} />
          </IconButton>
          <IconButton onClick={onClose}>
            <img src={CloseIcon} />
          </IconButton>
        </Box>

        {children({ isEdit, setIsEdit, message: 'niga' })}
      </Box>
    </StyledDrawerWrapper>
  );
};
