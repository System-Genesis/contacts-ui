import { Grid, IconButton, SwipeableDrawer, styled } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import BackIcon from '../../assets/icons/back.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { StyledDivider } from './content/divider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { closeSubEntity, closeSubUser, setDrawerObject, setIsDrawerOpen, setIsEdit } from '../../store/reducers/drawer';
import { EntityContentDrawer } from './content/entityContent';
import { GroupContactDrawer } from './content/groupContact';
import { ResultsTypes } from '../../lib/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUser } from '../../services/userService';
import { SaveButton } from '../buttons/save';
import { CancelButton } from '../buttons/cancel';
import { EntitySearchResult, GroupSearchResult } from '../../lib/types';
import { setUser, UserState } from '../../store/reducers/user';
import { SaveChangesDialog } from '../dialogs/saveChanges';
import { cleanFormData, hasChanges } from '../../utils/utils';
import { clickedEdit } from '../../matomo/actions';
import { HaveErrorDialog } from '../dialogs/haveError';

const StyledDrawerWrapper = styled(SwipeableDrawer, {
  shouldForwardProp: (prop) => prop !== 'isSubEntity',
})<{ isSubEntity?: boolean }>(({ isSubEntity }) => ({
  pointerEvents: isSubEntity ? 'none' : 'auto',
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
    msOverflowStyle: 'none',
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
}));

export const ContactDrawer: React.FC<{
  contact: GroupSearchResult | EntitySearchResult | UserState | undefined;
  sx?: object;
  alowEdit?: boolean;
  onClose?: () => void;
}> = ({ onClose = () => ({}), contact, sx = {}, alowEdit = true }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);
  const validationError = useSelector((state: RootState) => state.drawer.validationError);
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);
  const prevUsers = useSelector((state: RootState) => state.drawer.prevUsers);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const currentUser = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({});
  const [saveChangesDialogOpen, setSaveChangesDialogOpen] = useState(false);
  const [haveErrorDialogOpen, setHaveErrorDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => {
      return editUser(contact.id, data);
    },
  });

  const resetFormData = () => {
    setFormData({
      id: contact.id,
      hiddenFields: contact.hiddenFields ?? [],
      mobilePhone: contact.mobilePhone ?? '',
      redPhone: contact.redPhone ?? '',
      tags: contact.tags ?? [],
      otherPhones: contact?.otherPhones ?? [],
      jabberPhones: contact?.jabberPhones ?? [],
      mails: contact?.mails ?? [],
    });
  };

  useEffect(() => {
    if (contact) resetFormData();
  }, [contact, isEdit]);

  const onCancel = () => {
    dispatch(setIsEdit(false));
    resetFormData();
  };

  const onEdit = () => {
    dispatch(setIsEdit(true));
    dispatch(setDrawerObject(contact));
    clickedEdit(contact?.id);
  };

  const onSave = () => {
    dispatch(setIsEdit(false));
    const data = cleanFormData(formData);

    mutation.mutate(data);

    //update lists
    if (formData.id === currentUser.id) dispatch(setUser({ ...currentUser, ...data }));

    dispatch(setDrawerObject({ ...contact, ...data }));

    queryClient.setQueryData(['search', searchTerm, contact.type], (oldData) => {
      if (!oldData || !searchTerm) return;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => page.map((c) => (c.id === formData.id ? { ...c, ...data } : c))),
      };
    });

    queryClient.setQueryData(['history'], (oldData) => {
      if (!oldData) return;
      return oldData.map((c) => (c.id === formData.id ? { ...c, ...data } : c));
    });

    queryClient.setQueryData(['myFavorites'], (oldData) => {
      if (!oldData) return;
      return oldData.map((f) => (f.id === formData.id ? { ...f, ...data } : f));
    });
  };

  const onExit = () => {
    if (isEdit && hasChanges(cleanFormData(formData), contact)) {
      if (Object.values(validationError).some((error) => error.isError)) setHaveErrorDialogOpen(true);
      else setSaveChangesDialogOpen(true);
    } else {
      onCancel();
      if (subEntity?.id !== contact?.id) dispatch(setIsDrawerOpen(false));
      else dispatch(closeSubEntity());
    }
  };

  return (
    <StyledDrawerWrapper
      isSubEntity={subEntity?.id === contact?.id}
      anchor="right"
      open={!!contact}
      elevation={1}
      onOpen={() => subEntity?.id !== contact?.id && dispatch(setIsDrawerOpen(true))}
      onClose={() => onExit()}
      PaperProps={{
        sx: {
          borderRadius: '20px 0px 0px 20px',
          padding: theme.spacing(0),
          ...(subEntity?.id === contact?.id && { transform: 'translateX(480px)' }),
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
        <Grid container>
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
              {prevUsers.length > 0 && contact?.id !== subEntity?.id && (
                <IconButton
                  onClick={() => {
                    dispatch(closeSubEntity());
                    dispatch(closeSubUser());
                    dispatch(setIsEdit(false));
                    onClose();
                  }}
                  sx={{ p: 0, m: 0, ['&:hover']: { backgroundColor: 'transparent' } }}
                >
                  <img src={BackIcon} style={{ padding: 0 }} />
                </IconButton>
              )}
            </Grid>
            <Grid>
              {!isEdit && alowEdit && (
                <IconButton onClick={() => onEdit()} sx={{ p: 0 }}>
                  <img src={EditIcon} style={{ padding: 0 }} />
                </IconButton>
              )}
              <IconButton onClick={() => onExit()} sx={{ p: 0, m: 1 }}>
                <img src={CloseIcon} style={{ padding: 0 }} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container>
            {contact?.type === ResultsTypes.GROUP
              ? contact && <GroupContactDrawer formData={formData} setFormData={setFormData} />
              : contact && <EntityContentDrawer formData={formData} setFormData={setFormData} contact={contact} />}
          </Grid>
        </Grid>

        {isEdit && (
          <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <StyledDivider theme={theme} />
            <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: 2 }}>
              <CancelButton value={i18next.t(`cancel`)} onClick={onCancel} />
              <SaveButton
                value={i18next.t(`saveChanges`)}
                withEndIcon
                onClick={onSave}
                disabled={
                  !hasChanges(cleanFormData(formData), contact) ||
                  Object.values(validationError).some((error) => error.isError)
                }
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <SaveChangesDialog
        open={saveChangesDialogOpen}
        setOpen={setSaveChangesDialogOpen}
        disabledSave={Object.values(validationError).some((error) => error.isError)}
        onCancel={() => {
          setSaveChangesDialogOpen(false);
          onCancel();
        }}
        onSave={() => {
          setSaveChangesDialogOpen(false);
          onSave();
        }}
      />
      <HaveErrorDialog
        open={haveErrorDialogOpen}
        setOpen={setHaveErrorDialogOpen}
        onCancel={() => {
          setHaveErrorDialogOpen(false);
          onCancel();
        }}
        onReturn={() => setHaveErrorDialogOpen(false)}
      />
    </StyledDrawerWrapper>
  );
};
