import { Button, Grid, IconButton, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import i18next from 'i18next';
import { StyledDivider } from './content/Divider';
import { SaveIcon } from '../../assets/icons/save';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setIsDrawerOpen } from '../../store/reducers/drawer';
import { EntityContentCard } from './content/UserContent';
import { GroupContactCard } from './content/GroupContact';
import { ResultsTypes } from '../../lib/enums';

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

export const ContactDrawer: React.FC<{
  onOpen?: () => void;
  onClose?: () => void;
}> = ({ onClose = () => ({}) }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const contact = useSelector((state: RootState) => state.drawer.contact);

  return (
    <StyledDrawerWrapper
      anchor="right"
      open={isOpen}
      elevation={2}
      onOpen={() => dispatch(setIsDrawerOpen(true))}
      onClose={() => {
        setIsEdit(false);
        dispatch(setIsDrawerOpen(false));
        onClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: '20px 0px 0px 20px',
          padding: theme.spacing(0),
        },
      }}
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
          justifyContent: isEdit ? 'space-between' : 'start',
        }}
      >
        <Grid container sx={{}}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '3rem',
            }}
          >
            {!isEdit && (
              <IconButton onClick={() => setIsEdit((prev) => !prev)} sx={{ p: 0 }}>
                <img src={EditIcon} style={{ padding: 0 }} />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                dispatch(setIsDrawerOpen(false));
                setIsEdit(false);
                onClose();
              }}
              sx={{ p: 0, m: 1 }}
            >
              <img src={CloseIcon} style={{ padding: 0 }} />
            </IconButton>
          </Grid>
          <Grid container>
            {contact?.type === ResultsTypes.GROUP
              ? contact && <GroupContactCard isEdit={isEdit} contact={contact} />
              : contact && <EntityContentCard isEdit={isEdit} contact={contact} />}
          </Grid>
        </Grid>

        {isEdit && (
          <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <StyledDivider theme={theme} />
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: theme.colors.aqua,
                  fontSize: 14,
                  borderRadius: '30px',
                  borderColor: theme.colors.aqua,
                  backgroundColor: theme.colors.white,
                  '&:hover': { borderColor: theme.colors.aqua, backgroundColor: theme.colors.white },
                }}
                onClick={() => setIsEdit(false)}
              >
                {i18next.t(`cancel`)}
              </Button>
              <Button
                sx={{
                  color: theme.colors.white,
                  backgroundColor: theme.colors.aqua,
                  borderRadius: '30px',
                  fontSize: 14,
                  p: '0 1rem',
                  '&:hover': { backgroundColor: theme.colors.darkAqua },
                }}
                endIcon={<SaveIcon />}
              >
                {i18next.t(`saveChanges`)}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </StyledDrawerWrapper>
  );
};
