import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { DirectSubs } from './directSubs';
import { useQuery } from '@tanstack/react-query';
import { getSubsOfGroup } from '../../../services/searchService';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { ContactDrawer } from '../drawerWrapper';
import outlook from '../../../assets/icons/outlook.svg';
import jabber from '../../../assets/icons/jabber.svg';
import { GroupSearchResult } from '../../../lib/types';
import { getUserById } from '../../../services/userService';
import { openSubUser } from '../../../store/reducers/drawer';
import { UserTypes } from '../../../lib/enums';

export const GroupContactDrawer: React.FC<{ setFormData?: any; formData: any }> = ({ setFormData, formData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const contact: GroupSearchResult = useSelector((state: RootState) => state.drawer.contact!) as GroupSearchResult;
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);

  const { data, isPending } = useQuery({
    queryKey: ['subs', contact?.id],
    queryFn: () => getSubsOfGroup({ groupId: contact.id }),
    enabled: !!contact?.id,
  });

  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index === undefined) setFormData((prev) => ({ ...prev, [field]: '' }));
    else
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field][index]?.option ? [{ ...prev[field][index], option: '' }] : [''],
      }));
  };

  const handleHierarchyClick = async (id) => {
    const user = await getUserById({ id, type: UserTypes.GROUP });
    dispatch(openSubUser(user as GroupSearchResult));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.5, width: '100%' }}>
      <UpperContact
        contact={contact}
        setFormData={setFormData}
        title={contact.name}
        subTitle={data?.entities.length === 1 ? 'איש אחד' : `${data?.entities.length} ${i18next.t('people')}`}
        imageSize="3rem"
        hiddenFields={contact.hiddenFields}
        type="group"
        isPending={isPending}
      />

      {contact.hierarchy && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('description')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                fieldLabel={i18next.t('field.hierarchy')}
                value={contact.hierarchy}
                onClick={() => handleHierarchyClick(contact.directGroup)}
                sx={{ cursor: 'pointer', '&:hover': { color: theme.colors.aquaDark } }}
              />
            </StyledGridInfo>
          </StyledGridSection>
          <StyledDivider theme={theme} />
        </>
      )}

      {isEdit && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('fastShortcuts')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={'jabberPhones'}
                fieldLabel={i18next.t('jabber')}
                value={formData.jabberPhones?.[0]?.option}
                editable
                removable
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    jabberPhones: [{ ...prev.jabberPhones[0], option: event.target.value }],
                  }))
                }
                onRemove={() => handleRemove({ field: 'jabberPhones', index: 0 })}
                icon={jabber}
                keyFilter={/[0-9*]/}
                lengthLimit={8}
              />
              <FieldDiv
                field={'mail'}
                fieldLabel={i18next.t('field.mail')}
                value={formData.mails?.[0]?.option}
                editable
                removable
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    mails: [{ ...prev.mails?.[0], option: event.target.value }],
                  }))
                }
                onRemove={() => handleRemove({ field: 'mails', index: 0 })}
                icon={outlook}
                keyFilter={/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-@]$/}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {(isEdit ||
        contact.redPhone?.length > 0 ||
        contact.otherPhones?.length > 0 ||
        contact.mails?.length > 0 ||
        (contact.jabberPhones?.length > 0 && contact.jabberPhones[0]?.option !== '')) && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
            <StyledGridInfo container theme={theme}>
              {!isEdit && (
                <FieldDiv fieldLabel={i18next.t('field.jabberPhone')} value={contact.jabberPhones?.[0]?.option} />
              )}
              <FieldDiv
                field={'redPhone'}
                fieldLabel={i18next.t('field.redPhone')}
                value={formData.redPhone?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
                onRemove={() => handleRemove({ field: 'redPhone' })}
                keyFilter={/[0-9*]/}
                lengthLimit={10}
              />

              <FieldDiv
                field={'otherPhone'}
                fieldLabel={i18next.t('field.phone')}
                value={
                  isEdit
                    ? formData.otherPhones?.[0]
                    : formData.otherPhones?.[0]?.replace(/\D/g, '').replace(/(\d{3})(\d{7})/, '$1-$2')
                }
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }))}
                onRemove={() => handleRemove({ field: 'otherPhones', index: 0 })}
                keyFilter={/[0-9*]/}
                lengthLimit={10}
              />

              {!isEdit && <FieldDiv fieldLabel={i18next.t('field.mail')} value={contact.mails?.[0]?.option} />}
            </StyledGridInfo>
          </StyledGridSection>
          <StyledDivider theme={theme} />
        </>
      )}

      {!isEdit && (
        <StyledGridSection container theme={theme} margin={0}>
          <DirectSubs
            type="entity"
            isPending={isPending}
            header="משרתים"
            subs={
              data?.entities.sort((a, b) => {
                const aIncludes = Object.values(a.commanderOf)?.includes(contact.id) ? 1 : 0;
                const bIncludes = Object.values(b.commanderOf)?.includes(contact.id) ? 1 : 0;
                if (bIncludes - aIncludes !== 0) return bIncludes - aIncludes;
                return a.fullName?.localeCompare(b.fullName);
              }) ?? []
            }
          />
        </StyledGridSection>
      )}

      {!isEdit && (
        <StyledGridSection container theme={theme} margin={0}>
          <DirectSubs
            type="group"
            header="תת היררכיות"
            subs={data?.groups.sort((a, b) => a.name?.localeCompare(b.name)) ?? []}
            isPending={isPending}
          />
        </StyledGridSection>
      )}

      <ContactDrawer contact={subEntity} sx={{ mr: '481px' }} alowEdit={false} />
    </Grid>
  );
};
