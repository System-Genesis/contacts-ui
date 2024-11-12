import { Typography, useTheme, Grid } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { EntitySearchResult } from '../../../lib/types';

export const EntityContentDrawer: React.FC<{
  setFormData: any;
  formData: any;
  isEdit: boolean;
  contact: EntitySearchResult;
}> = ({ contact, setFormData, formData, isEdit }) => {
  const theme = useTheme();

  const handleHide = (isHidden, field) =>
    setFormData((prev) => ({
      ...prev,
      hiddenFields: !isHidden ? prev.hiddenFields.concat(field) : prev.hiddenFields.filter((f) => f !== field),
    }));

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <UpperContact contact={contact} isEdit={isEdit} title={contact.fullName} subTitle={contact.jobTitle} />

      {!isEdit && (
        <StyledGridSection container theme={theme}>
          <Typography variant="body1">{i18next.t(`role`)}</Typography>
          <StyledGridInfo container theme={theme}>
            <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
            <FieldDiv field={i18next.t('field.jobTitle')} value={contact.jobTitle} />
          </StyledGridInfo>
        </StyledGridSection>
      )}
      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(` `)}</Typography>
        <StyledGridInfo container theme={theme}>
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
            field={i18next.t('field.identityCard')}
            value={contact.identityCard}
            isHidden={formData.hiddenFields?.includes('identityCard')}
            onHide={(isHidden) => handleHide(isHidden, 'identityCard')}
          />
          <FieldDiv isEdit={isEdit} field={i18next.t('field.rank')} value={contact.rank} />
          <FieldDiv
            isEdit={isEdit}
            field={i18next.t('field.birthDate')}
            value={contact.birthDate ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB') : undefined}
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

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`extraContactDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
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
          <FieldDiv
            field={i18next.t('field.redPhone')}
            hidable
            editable 
            value={contact.redPhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
            isHidden={formData.hiddenFields?.includes('redPhone')}
            onHide={(isHidden) => handleHide(isHidden, 'redPhone')}
          />
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
