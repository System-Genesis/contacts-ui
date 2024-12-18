import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { DirectSubs } from './directSubs';
import { useQuery } from '@tanstack/react-query';
import { getSubsOfGroup } from '../../../services/searchService';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { ContactDrawer } from '../drawerWrapper';
import outlook from '../../../assets/icons/outlook.svg';
import jabber from '../../../assets/icons/jabber.svg';
import { GroupSearchResult } from '../../../lib/types';

export const GroupContactDrawer: React.FC<{
  setFormData?: any;
  formData: any;
  isEdit: boolean;
  setFormErrors: any;
  formValidations: any;
}> = ({ setFormData, formData, isEdit, setFormErrors, formValidations }) => {
  const theme = useTheme();
  const contact: GroupSearchResult = useSelector((state: RootState) => state.drawer.contact!) as GroupSearchResult;
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);

  const subs = useQuery({
    queryKey: ['subs', contact?.id],
    queryFn: () => getSubsOfGroup({ groupId: contact.id }),
    initialData: { entities: [], groups: [] },
    enabled: !!contact?.id,
  });

  const { entities, groups } = subs.data;

  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index !== undefined) setFormData((prev) => ({ ...prev, [field]: [''] }));
    else setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.5, width: '100%' }}>
      <UpperContact
        contact={contact}
        isEdit={isEdit}
        setFormData={setFormData}
        title={contact.name}
        subTitle={
          Number(contact.entitiesCount) === 1 ? 'איש 1' : `${contact.entitiesCount ?? 0} ${i18next.t('people')}`
        }
        imageSize="3rem"
        hiddenFields={contact.hiddenFields}
        type="group"
      />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('description')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
        </StyledGridInfo>
      </StyledGridSection>

      {isEdit && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('fastShortcuts')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={i18next.t('jabber')}
                editable
                removable
                value={formData.jabberPhone?.toString()}
                isEdit={isEdit}
                onChange={(event) => {
                  setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }));
                  setFormErrors((prev) => ({ ...prev, jabberPhone: formValidations.jabberPhone(event.target.value) }));
                }}
                onRemove={() => handleRemove({ field: 'jabberPhone' })}
                icon={jabber}
                validation={formValidations.jabberPhone}
                helperText={i18next.t('validationError.jabberPhone')}
              />
              <FieldDiv
                field={i18next.t('outlook')}
                editable
                removable
                value={formData.mails?.[0]?.toString()}
                isEdit={isEdit}
                onChange={(event) => {
                  setFormData((prev) => ({ ...prev, mails: [event.target.value] }));
                  setFormErrors((prev) => ({ ...prev, mails: formValidations.mail(event.target.value) }));
                }}
                onRemove={() => handleRemove({ field: 'mails', index: 0 })}
                icon={outlook}
                validation={formValidations.mail}
                helperText={i18next.t('validationError.mail')}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {(isEdit || contact.otherPhones?.length > 0 || contact.mails?.length > 0) && (
        <>
          <StyledDivider theme={theme} />

          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={i18next.t('field.redPhone')}
                editable
                removable
                value={formData.redPhone?.toString()}
                isEdit={isEdit}
                onChange={(event) => {
                  setFormData((prev) => ({ ...prev, redPhone: event.target.value }));
                  setFormErrors((prev) => ({ ...prev, redPhone: formValidations.redPhone(event.target.value) }));
                }}
                onRemove={() => handleRemove({ field: 'redPhone' })}
                validation={formValidations.redPhone}
                helperText={i18next.t('validationError.redPhone')}
              />

              <FieldDiv
                field={i18next.t('field.otherPhone')}
                editable
                removable
                value={formData.otherPhones?.[0]?.toString()}
                isEdit={isEdit}
                onChange={(event) => setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }))}
                onRemove={() => handleRemove({ field: 'otherPhones', index: 0 })}
                validation={formValidations.otherPhone}
                helperText={i18next.t('validationError.otherPhone')}
              />

              {!isEdit && <FieldDiv field={i18next.t('mail')} value={contact.mails?.[0]} />}
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {!isEdit && entities.length > 0 && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">משרתים</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectSubs
                type="entity"
                subs={[
                  ...entities.sort((a, b) => {
                    const aIncludes = Object.values(a.commanderOf)?.includes(contact.id) ? 1 : 0;
                    const bIncludes = Object.values(b.commanderOf)?.includes(contact.id) ? 1 : 0;
                    if (bIncludes - aIncludes !== 0) return bIncludes - aIncludes;
                    return a.fullName?.localeCompare(b.fullName);
                  }),
                ]}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {!isEdit && groups.length > 0 && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">תתי היררכיות</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectSubs type="group" subs={[...groups.sort((a, b) => a.name?.localeCompare(b.name))]} />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      <ContactDrawer contact={subEntity} sx={{ mr: '481px' }} alowEdit={false} />
    </Grid>
  );
};
