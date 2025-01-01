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

export const GroupContactDrawer: React.FC<{ setFormData?: any; formData: any }> = ({ setFormData, formData }) => {
  const theme = useTheme();
  const contact: GroupSearchResult = useSelector((state: RootState) => state.drawer.contact!) as GroupSearchResult;
  const subEntity = useSelector((state: RootState) => state.drawer.subEntity);
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);

  const {
    data: { entities, groups },
  } = useQuery({
    queryKey: ['subs', contact?.id],
    queryFn: () => getSubsOfGroup({ groupId: contact.id }),
    initialData: { entities: [], groups: [] },
    enabled: !!contact?.id,
  });

  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index !== undefined) setFormData((prev) => ({ ...prev, [field]: [''] }));
    else setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.5, width: '100%' }}>
      <UpperContact
        contact={contact}
        setFormData={setFormData}
        title={contact.name}
        subTitle={entities.length === 1 ? 'איש אחד' : `${entities.length} ${i18next.t('people')}`}
        imageSize="3rem"
        hiddenFields={contact.hiddenFields}
        type="group"
      />

      {contact.hierarchy && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('description')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv fieldLabel={i18next.t('field.hierarchy')} value={contact.hierarchy} />
            </StyledGridInfo>
          </StyledGridSection>
          {(isEdit ||
            contact.redPhone?.length > 0 ||
            contact.otherPhones?.length > 0 ||
            contact.mails?.length > 0 ||
            (!isEdit && (entities.length > 0 || groups.length > 0))) && <StyledDivider theme={theme} />}
        </>
      )}

      {isEdit && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('fastShortcuts')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={'jabberPhone'}
                fieldLabel={i18next.t('jabber')}
                value={formData.jabberPhone?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }))}
                onRemove={() => handleRemove({ field: 'jabberPhone' })}
                icon={jabber}
              />
              <FieldDiv
                field={'mail'}
                fieldLabel={i18next.t('field.mail')}
                value={formData.mails?.[0]?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, mails: [event.target.value] }))}
                onRemove={() => handleRemove({ field: 'mails', index: 0 })}
                icon={outlook}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {(isEdit || contact.redPhone?.length > 0 || contact.otherPhones?.length > 0 || contact.mails?.length > 0) && (
        <>
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={'redPhone'}
                fieldLabel={i18next.t('field.redPhone')}
                value={formData.redPhone?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
                onRemove={() => handleRemove({ field: 'redPhone' })}
              />

              <FieldDiv
                field={'otherPhone'}
                fieldLabel={i18next.t('field.otherPhone')}
                value={formData.otherPhones?.[0]?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }))}
                onRemove={() => handleRemove({ field: 'otherPhones', index: 0 })}
              />

              {!isEdit && <FieldDiv fieldLabel={i18next.t('field.mail')} value={contact.mails?.[0]} />}
            </StyledGridInfo>
          </StyledGridSection>
          {!isEdit && (entities.length > 0 || groups.length > 0) && <StyledDivider theme={theme} />}
        </>
      )}

      {!isEdit && entities.length > 0 && (
        <>
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
          {!isEdit && groups.length > 0 && <StyledDivider theme={theme} />}
        </>
      )}

      {!isEdit && groups.length > 0 && (
        <>
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">תת היררכיות</Typography>
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
