import i18next from 'i18next';
import { Typography, useTheme, Grid } from '@mui/material';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { EntitySearchResult } from '../../../lib/types';
import { AddPhone } from '../../buttons/addPhone';
import outlook from '../../../assets/icons/outlook.svg';
import jabber from '../../../assets/icons/jabber.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const EntityContentDrawer: React.FC<{
  contact: EntitySearchResult;
  formData: any;
  setFormData: any;
}> = ({ contact, setFormData, formData }) => {
  const theme = useTheme();
  const isEdit = useSelector((state: RootState) => state.drawer.isEdit);

  const handleHide = (isHidden, field) =>
    setFormData((prev) => ({
      ...prev,
      hiddenFields: !isHidden ? prev.hiddenFields.concat(field).sort() : prev.hiddenFields.filter((f) => f !== field),
    }));

  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index !== undefined)
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    else setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
      <UpperContact
        contact={contact}
        title={contact.fullName}
        subTitle={contact.jobTitle}
        setFormData={setFormData}
        hiddenFields={contact.hiddenFields}
        imageSize={contact.entityType === 'GoalUser' ? '3rem' : '5rem'}
        type={contact.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
      />

      {!isEdit && (contact.hierarchy ?? (contact.entityType !== 'GoalUser' && contact.jobTitle)) && (
        <StyledGridSection container theme={theme}>
          <Typography variant="body1">{i18next.t(`role`)}</Typography>
          <StyledGridInfo container theme={theme}>
            <FieldDiv fieldLabel={i18next.t('field.hierarchy')} value={contact.hierarchy} />
            {contact.entityType !== 'GoalUser' && (
              <FieldDiv fieldLabel={i18next.t('field.jobTitle')} value={contact.jobTitle} />
            )}
          </StyledGridInfo>
        </StyledGridSection>
      )}

      {contact.entityType !== 'GoalUser' && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('userDetails')}</Typography>
            <StyledGridInfo container theme={theme}>
              {(contact.personalNumber ?? contact.identityCard) ? (
                <>
                  <FieldDiv
                    fieldLabel={i18next.t('field.personalNumber')}
                    value={contact.personalNumber}
                    hidable
                    isHidden={formData.hiddenFields?.includes('personalNumber')}
                    onHide={(isHidden) => handleHide(isHidden, 'personalNumber')}
                  />
                  <FieldDiv
                    fieldLabel={i18next.t('field.identityCard') ?? i18next.t('noData')}
                    value={contact.identityCard}
                    hidable
                    isHidden={formData.hiddenFields?.includes('identityCard')}
                    onHide={(isHidden) => handleHide(isHidden, 'identityCard')}
                  />
                </>
              ) : (
                <FieldDiv
                  fieldLabel={i18next.t('field.employeeId') ?? i18next.t('noData')}
                  value={contact.employeeId ?? i18next.t('noData')}
                  hidable
                  isHidden={formData.hiddenFields?.includes('employeeId')}
                  onHide={(isHidden) => handleHide(isHidden, 'employeeId')}
                />
              )}

              {contact.rank && contact.rank !== i18next.t('unknown') && (
                <FieldDiv fieldLabel={i18next.t('field.rank')} value={contact.rank} />
              )}
              <FieldDiv
                fieldLabel={i18next.t('field.birthDate')}
                value={
                  contact.birthDate
                    ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB')
                    : i18next.t('noData')
                }
              />
              <FieldDiv fieldLabel={i18next.t('field.serviceType')} value={contact.serviceType} />
              {contact.dischargeDay && (
                <FieldDiv
                  fieldLabel={i18next.t('field.dischargeDate')}
                  value={new Date(contact.dischargeDay.toString()).toLocaleDateString('en-GB')}
                />
              )}
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {contact.entityType === 'GoalUser' && (isEdit || !!contact.jabberPhone || formData.mails.length > 0) && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t('fastShortcuts')}</Typography>
            <StyledGridInfo container theme={theme}>
              <FieldDiv
                field={'jabberPhone'}
                fieldLabel={i18next.t('jabber')}
                value={formData.jabberPhone?.toString()}
                required={!!contact.jabberPhone}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }))}
                onRemove={() => handleRemove({ field: 'jabberPhone' })}
                icon={jabber}
              />
              <FieldDiv
                field={'mail'}
                fieldLabel={i18next.t('mail')}
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

      {(isEdit ||
        (contact.mobilePhone && contact.entityType !== 'GoalUser') ||
        contact.jabberPhone ||
        contact.redPhone ||
        contact?.otherPhones?.length > 0) && (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme}>
            <Typography variant="body1">{i18next.t(`extraContactDetails`)}</Typography>
            <StyledGridInfo container theme={theme}>
              {contact.entityType !== 'GoalUser' && (
                <FieldDiv
                  field={'mobilePhone'}
                  fieldLabel={i18next.t('field.mobilePhone')}
                  value={
                    isEdit
                      ? formData.mobilePhone
                      : formData.mobilePhone?.replace(/\D/g, '').replace(/(\d{3})(\d{7})/, '$1-$2')
                  }
                  required={!!contact.mobilePhone}
                  hidable
                  editable
                  onChange={(event) => setFormData((prev) => ({ ...prev, mobilePhone: event.target.value }))}
                  isHidden={formData.hiddenFields?.includes('mobilePhone')}
                  onHide={(isHidden) => handleHide(isHidden, 'mobilePhone')}
                />
              )}
              {contact.entityType !== 'GoalUser' && (
                <FieldDiv
                  field={'jabberPhone'}
                  fieldLabel={i18next.t('field.jabberPhone')}
                  value={formData.jabberPhone?.toString()}
                  required={!!contact.jabberPhone}
                  editable
                  hidable
                  onChange={(event) => setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }))}
                  isHidden={formData.hiddenFields?.includes('jabberPhone')}
                  onHide={(isHidden) => handleHide(isHidden, 'jabberPhone')}
                />
              )}
              <FieldDiv
                field={'redPhone'}
                fieldLabel={i18next.t('field.redPhone')}
                value={formData.redPhone?.toString()}
                editable
                removable
                onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
                onRemove={() => handleRemove({ field: 'redPhone' })}
                isHidden={formData.hiddenFields?.includes('redPhone')}
              />
              {contact.entityType !== 'GoalUser' ? (
                <>
                  {formData?.otherPhones?.map((otherPhone, index) => (
                    <FieldDiv
                      key={index}
                      field={'otherPhone'}
                      fieldLabel={i18next.t('field.otherPhone')}
                      value={otherPhone}
                      editable
                      removable
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherPhones: formData.otherPhones?.map((c, i) => (i === index ? event.target.value : c)),
                        }))
                      }
                      onRemove={() => handleRemove({ field: 'otherPhones', index })}
                    />
                  ))}
                  {isEdit && formData.otherPhones?.length < 3 && (
                    <AddPhone
                      onClick={() => setFormData((prev) => ({ ...prev, otherPhones: [...prev.otherPhones, ''] }))}
                    />
                  )}
                </>
              ) : (
                <FieldDiv
                  field={'otherPhone'}
                  fieldLabel={i18next.t('field.otherPhone')}
                  value={formData.otherPhones?.[0]?.toString()}
                  editable
                  removable
                  onChange={(event) => setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }))}
                  onRemove={() => handleRemove({ field: 'otherPhones', index: 0 })}
                />
              )}
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}
    </Grid>
  );
};
