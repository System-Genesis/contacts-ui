import { Box, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import { useTheme } from '@mui/material';
import Title from '../divs/Title';

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
  title: string;
  children: any;
  width: string;
  subTitle?: string | undefined;
  openToRight?: boolean;
}> = ({ children, isOpen, setIsOpen, onClose, title, width, subTitle, openToRight = false }) => {
  const theme = useTheme();
  return (
    <StyledDrawerWrapper
      anchor="right"
      open={isOpen}
      elevation={2}
      onOpen={() => setIsOpen(true)}
      onClose={onClose ?? (() => setIsOpen(false))}
      PaperProps={{ sx: { borderRadius: '12px 0px 0px 12px' } }}
      openToRight={openToRight}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(2),
          p: 3,
          width: width,
        }}
      >
        <Box>
          <Title
            title={title}
            titleProps={{
              style: { fontSize: theme.typography.h6.fontSize, color: theme.colors.profile.value, fontWeight: 'bold' },
            }}
            buttonProps={{
              icon: CloseIcon,
              onClick: () => setIsOpen(false),
            }}
          />
          {subTitle && (
            <Title
              title={subTitle}
              titleProps={{
                style: {
                  fontSize: theme.typography.body2.fontSize,
                  color: theme.colors.profile.property,
                },
              }}
            />
          )}
        </Box>

        {children}
      </Box>
    </StyledDrawerWrapper>
  );
};
