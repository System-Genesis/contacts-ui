import i18next from 'i18next';
import { Typography, useTheme, Grid } from '@mui/material';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { EntitySearchResult } from '../../../lib/types';
import { AddPhone } from '../../buttons/addPhone';
import outlook from '../../../assets/icons/outlook.svg';
import jabber from '../../../assets/icons/jabber.svg';

export const EntityContentDrawer: React.FC<{
  isEdit: boolean;
  contact: EntitySearchResult;
  formData: any;
  setFormData: any;
  formValidations: any;
  setFormErrors: any;
}> = ({ contact, setFormData, formData, isEdit, formValidations, setFormErrors }) => {
  const theme = useTheme();

  const handleHide = (isHidden, field) =>
    setFormData((prev) => ({
      ...prev,
      hiddenFields: !isHidden ? prev.hiddenFields.concat(field).sort() : prev.hiddenFields.filter((f) => f !== field),
    }));

  const handleRemove = ({ field, index }: { field: string; index?: number }) => {
    if (index !== undefined)
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index), // Remove the item at the specified index
      }));
    else setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
      <UpperContact
        contact={contact}
        isEdit={isEdit}
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
            <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
            {contact.entityType !== 'GoalUser' && (
              <FieldDiv field={i18next.t('field.jobTitle')} value={contact.jobTitle} />
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
                    isEdit={isEdit}
                    hidable
                    field={i18next.t('field.personalNumber')}
                    value={contact.personalNumber}
                    isHidden={formData.hiddenFields?.includes('personalNumber')}
                    onHide={(isHidden) => handleHide(isHidden, 'personalNumber')}
                  />
                  <FieldDiv
                    isEdit={isEdit}
                    hidable
                    field={i18next.t('field.identityCard') ?? i18next.t('noData')}
                    value={contact.identityCard}
                    isHidden={formData.hiddenFields?.includes('identityCard')}
                    onHide={(isHidden) => handleHide(isHidden, 'identityCard')}
                  />
                </>
              ) : (
                <FieldDiv
                  isEdit={isEdit}
                  hidable
                  field={i18next.t('field.employeeId') ?? i18next.t('noData')}
                  value={contact.employeeId ?? i18next.t('noData')}
                  isHidden={formData.hiddenFields?.includes('employeeId')}
                  onHide={(isHidden) => handleHide(isHidden, 'employeeId')}
                />
              )}

              {contact.rank !== i18next.t('unknown') && (
                <FieldDiv isEdit={isEdit} field={i18next.t('field.rank')} value={contact.rank} />
              )}
              <FieldDiv
                isEdit={isEdit}
                field={i18next.t('field.birthDate')}
                value={
                  contact.birthDate
                    ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB')
                    : i18next.t('noData')
                }
              />
              <FieldDiv isEdit={isEdit} field={i18next.t('field.serviceType')} value={contact.serviceType} />
              {contact.dischargeDay && (
                <FieldDiv
                  isEdit={isEdit}
                  field={i18next.t('field.dischargeDate')}
                  value={new Date(contact.dischargeDay.toString()).toLocaleDateString('en-GB')}
                />
              )}
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}

      {contact.entityType === 'GoalUser' && (
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
                  field={i18next.t('field.mobilePhone')}
                  hidable
                  editable
                  value={
                    isEdit
                      ? formData.mobilePhone
                      : formData.mobilePhone?.replace(/\D/g, '').replace(/(\d{3})(\d{7})/, '$1-$2')
                  }
                  isEdit={isEdit}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, mobilePhone: event.target.value }));
                    setFormErrors((prev) => ({
                      ...prev,
                      mobilePhone: formValidations.mobilePhone(event.target.value),
                    }));
                  }}
                  isHidden={formData.hiddenFields?.includes('mobilePhone')}
                  onHide={(isHidden) => handleHide(isHidden, 'mobilePhone')}
                  validation={formValidations.mobilePhone}
                  helperText={i18next.t('validationError.mobilePhone')}
                />
              )}
              {contact.entityType !== 'GoalUser' && (
                <FieldDiv
                  field={i18next.t('field.jabberPhone')}
                  editable
                  hidable
                  value={formData.jabberPhone?.toString()}
                  isEdit={isEdit}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }));
                    setFormErrors((prev) => ({
                      ...prev,
                      jabberPhone: formValidations.jabberPhone(event.target.value),
                    }));
                  }}
                  isHidden={formData.hiddenFields?.includes('jabberPhone')}
                  onHide={(isHidden) => handleHide(isHidden, 'jabberPhone')}
                  validation={formValidations.jabberPhone}
                  helperText={i18next.t('validationError.jabberPhone')}
                />
              )}
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
                isHidden={formData.hiddenFields?.includes('redPhone')}
                validation={formValidations.redPhone}
                helperText={i18next.t('validationError.redPhone')}
              />
              {contact.entityType !== 'GoalUser' ? (
                <>
                  {formData?.otherPhones?.map((otherPhone, index) => (
                    <FieldDiv
                      key={index}
                      field={i18next.t('field.otherPhone')}
                      editable
                      removable
                      value={otherPhone}
                      isEdit={isEdit}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          otherPhones: formData.otherPhones?.map((c, i) => (i === index ? event.target.value : c)),
                        }));
                        setFormErrors((prev) => ({
                          ...prev,
                          otherPhones: formData.otherPhones?.every((c, i) =>
                            formValidations.otherPhone(i === index ? event.target.value : c),
                          ),
                        }));
                      }}
                      onRemove={() => handleRemove({ field: 'otherPhones', index })}
                      helperText={i18next.t('validationError.otherPhone')}
                      validation={formValidations.otherPhone}
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
                  field={i18next.t('field.otherPhone')}
                  editable
                  removable
                  value={formData.otherPhones?.[0]?.toString()}
                  isEdit={isEdit}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, otherPhones: [event.target.value] }));
                    setFormErrors((prev) => ({ ...prev, otherPhones: formValidations.otherPhone(event.target.value) }));
                  }}
                  onRemove={() => handleRemove({ field: 'otherPhones', index: 0 })}
                  helperText={i18next.t('validationError.otherPhone')}
                  validation={formValidations.otherPhone}
                />
              )}
            </StyledGridInfo>
          </StyledGridSection>
        </>
      )}
    </Grid>
  );
};
