import { Box, Grid, IconButton, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import BackIcon from '../../assets/icons/back.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { StyledDivider } from './content/divider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { closeSubEntity, closeSubGroup, setDrawerObject, setIsDrawerOpen } from '../../store/reducers/drawer';
import { EntityContentDrawer } from './content/entityContent';
import { GroupContactDrawer } from './content/groupContact';
import { ResultsTypes } from '../../lib/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUser } from '../../services/userService';
import { SaveButton } from '../buttons/save';
import { CancelButton } from '../buttons/cancel';
import { EntitySearchResult, GroupSearchResult } from '../../lib/types';
import { setUser, UserState } from '../../store/reducers/user';

const StyledDrawerWrapper = styled(SwipeableDrawer)<{ isSubEntity?: boolean }>(({ isSubEntity }) => ({
  pointerEvents: isSubEntity ? 'none' : 'auto', // Allow interactions with the main drawer when nested drawer is open
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
    pointerEvents: 'auto',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    boxShadow: isSubEntity
      ? 'none'
      : `
        30px 0px 65px 0px #383F511F,
        118px 0px 118px 0px #383F511C,
        266px 0px 159px 0px #383F510F,
        472px 0px 189px 0px #383F5103,
        738px 0px 207px 0px #383F5100`,
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0,0,0,0)', // Fully transparent backdrop
  },
}));

export const ContactDrawer: React.FC<{
  contact: GroupSearchResult | EntitySearchResult | UserState;
  sx?: object;
  onClose?: () => void;
}> = ({ onClose = () => ({}), contact, sx = {} }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);
  const subGroups = useSelector((state: RootState) => state.drawer.subGroups);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const currentUser = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({});

  const mutation = useMutation({
    mutationFn: () => {
      dispatch(setDrawerObject({ ...contact, ...formData }));
      const updatedUser = editUser(contact.id, formData);
      return updatedUser;
    },
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        id: contact.id,
        hiddenFields: contact.hiddenFields,
        mobilePhone: contact.mobilePhone,
        jabberPhone: contact.jabberPhone,
        redPhone: contact.redPhone,
      });
    }
  }, [contact]);

  return (
    <StyledDrawerWrapper
      isSubEntity={subEntity?.id === contact.id}
      anchor="right"
      // variant={subEntity?.id === contact.id ? 'temporary' : 'permanent'}
      open={!!contact}
      elevation={2}
      onOpen={() => {
        if (subEntity?.id !== contact.id) dispatch(setIsDrawerOpen(true));
      }}
      onClose={() => {
        setIsEdit(false);
        if (subEntity?.id !== contact.id) dispatch(setIsDrawerOpen(false));
        else dispatch(closeSubEntity());
        onClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: '20px 0px 0px 20px',
          padding: theme.spacing(0),
        },
      }}
      sx={sx}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: theme.spacing(0),
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
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '3rem',
            }}
          >
            <Grid>
              {subGroups.length ? (
                <IconButton
                  onClick={() => {
                    dispatch(closeSubGroup());
                    setIsEdit(false);
                    onClose();
                  }}
                  sx={{ p: 0, m: 0, ['&:hover']: { backgroundColor: 'transparent' } }}
                >
                  <img src={BackIcon} style={{ padding: 0 }} />
                </IconButton>
              ) : (
                <></>
              )}
            </Grid>
            <Grid>
              {!isEdit && (
                <IconButton onClick={() => setIsEdit(true)} sx={{ p: 0 }}>
                  <img src={EditIcon} style={{ padding: 0 }} />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setIsEdit(false);
                  if (subEntity?.id !== contact.id) dispatch(setIsDrawerOpen(false));
                  else dispatch(closeSubEntity());
                  onClose();
                }}
                sx={{ p: 0, m: 1 }}
              >
                <img src={CloseIcon} style={{ padding: 0 }} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container>
            {contact?.type === ResultsTypes.GROUP
              ? contact && <GroupContactDrawer isEdit={isEdit} />
              : contact && (
                  <EntityContentDrawer
                    formData={formData}
                    setFormData={setFormData}
                    isEdit={isEdit}
                    contact={contact}
                  />
                )}
          </Grid>
        </Grid>

        {isEdit && (
          <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <StyledDivider theme={theme} />
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: 2 }}>
              <CancelButton value={i18next.t(`cancel`)} onClick={() => setIsEdit(false)} />
              <SaveButton
                value={i18next.t(`saveChanges`)}
                onClick={() => {
                  mutation.mutate();

                  setIsEdit(false);

                  queryClient.setQueryData(['search', searchTerm, contact.type], (oldData) => {
                    if (!oldData) return;
                    return {
                      ...oldData,
                      pages: oldData.pages.map((page) =>
                        page.map((c) => (c.id === formData.id ? { ...c, ...formData } : c)),
                      ),
                    };
                  });

                  queryClient.setQueryData(['history'], (oldData) => {
                    if (!oldData) return;
                    return oldData.map((c) => (c.id === formData.id ? { ...c, ...formData } : c));
                  });
                  queryClient.setQueryData(['myFavorites'], (oldData) => {
                    if (!oldData) return;
                    return oldData.map((f) => (f.id === formData.id ? { ...f, ...formData } : f));
                  });

                  if (formData.id === currentUser.id) dispatch(setUser({ ...currentUser, ...formData }));
                }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </StyledDrawerWrapper>
  );
};
