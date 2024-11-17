import i18next from 'i18next';
import { Typography, useTheme, Grid } from '@mui/material';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { EntitySearchResult } from '../../../lib/types';
import { AddPhone } from '../../buttons/addPhone';

export const EntityContentDrawer: React.FC<{
  setFormData: any;
  formData: any;
  formErrors: any;
  isEdit: boolean;
  contact: EntitySearchResult;
}> = ({ contact, setFormData, formData, isEdit, formErrors }) => {
  const theme = useTheme();

  const handleHide = (isHidden, field) =>
    setFormData((prev) => ({
      ...prev,
      hiddenFields: !isHidden ? prev.hiddenFields.concat(field) : prev.hiddenFields.filter((f) => f !== field),
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
        hiddenFields={contact.hiddenFields}
        imageSize={contact.entityType === 'GoalUser' ? '3rem' : '5rem'}
        type={contact.entityType === 'GoalUser' ? 'goalUser' : 'entity'}
      />

      {!isEdit && (
        <StyledGridSection container theme={theme}>
          <Typography variant="body1">{i18next.t(`role`)}</Typography>
          <StyledGridInfo container theme={theme}>
            <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
            <FieldDiv field={i18next.t('field.jobTitle')} value={contact.jobTitle} />
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
                    value={contact.personalNumber ?? i18next.t('noData')}
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

              <FieldDiv isEdit={isEdit} field={i18next.t('field.rank')} value={contact.rank ?? i18next.t('noData')} />
              <FieldDiv
                isEdit={isEdit}
                field={i18next.t('field.birthDate')}
                value={
                  contact.birthDate
                    ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB')
                    : i18next.t('noData')
                }
              />
              <FieldDiv
                isEdit={isEdit}
                field={i18next.t('field.serviceType')}
                value={contact.serviceType ?? i18next.t('noData')}
              />
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
      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`extraContactDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          {contact.entityType !== 'GoalUser' && (
            <FieldDiv
              field={i18next.t('field.mobilePhone')}
              hidable
              editable
              value={contact.mobilePhone?.toString()}
              isEdit={isEdit}
              onChange={(event) => setFormData((prev) => ({ ...prev, mobilePhone: event.target.value }))}
              isHidden={formData.hiddenFields?.includes('mobilePhone')}
              onHide={(isHidden) => handleHide(isHidden, 'mobilePhone')}
            />
          )}
          <FieldDiv
            field={i18next.t('field.jabberPhone')}
            editable
            hidable
            value={contact.jabberPhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }))}
            isHidden={formData.hiddenFields?.includes('jabberPhone')}
            onHide={(isHidden) => handleHide(isHidden, 'jabberPhone')}
          />
          <FieldDiv
            field={i18next.t('field.redPhone')}
            editable
            removable
            value={formData.redPhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
            onRemove={() => handleRemove({ field: 'redPhone' })}
            isHidden={formData.hiddenFields?.includes('redPhone')}
            onHide={(isHidden) => handleHide(isHidden, 'redPhone')}
          />
          {formData.otherPhones?.map((otherPhone, index) => (
            <FieldDiv
              field={i18next.t('field.otherPhone')}
              editable
              removable
              value={otherPhone}
              isEdit={isEdit}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  otherPhones: formData.otherPhones.map((c, i) => (i === index ? event.target.value : c)),
                }))
              }
              onRemove={() => handleRemove({ field: 'otherPhones', index })}
            />
          ))}
          {isEdit && formData.otherPhones?.length < 3 && (
            <AddPhone onClick={() => setFormData((prev) => ({ ...prev, otherPhones: [...prev.otherPhones, ''] }))} />
          )}
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
