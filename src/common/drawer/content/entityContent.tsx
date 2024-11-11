import { Typography, useTheme, Grid } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const EntityContentDrawer: React.FC<{ setFormData: any; formData: any; isEdit: boolean }> = ({
  setFormData,
  formData,
  isEdit,
}) => {
  const theme = useTheme();
  const contact = useSelector((state: RootState) => state.drawer.contact);

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <UpperContact contact={contact} isEdit={isEdit} title={contact.fullName} subTitle={contact.jobTitle} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`role`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
          <FieldDiv field={i18next.t('field.uniqueId')} value={contact.uniqueId} />
          <FieldDiv field={i18next.t('field.mail')} value={contact.mail} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`personalDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv
            field={i18next.t('field.mobilePhone')}
            value={contact.mobilePhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, mobilePhone: event.target.value }))}
            isHidden={formData.hiddenFields?.includes('mobilePhone')}
            onHide={(isHidden) =>
              setFormData((prev) => ({
                ...prev,
                hiddenFields: !isHidden
                  ? prev.hiddenFields.concat('mobilePhone')
                  : prev.hiddenFields.filter((field) => field !== 'mobilePhone'),
              }))
            }
          />
          <FieldDiv
            field={i18next.t('field.birthDate')}
            value={contact.birthDate ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB') : undefined}
          />
          <FieldDiv
            field={i18next.t('field.jabberPhone')}
            value={contact.jabberPhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, jabberPhone: event.target.value }))}
            isHidden={formData.hiddenFields?.includes('jabberPhone')}
            onHide={(isHidden) =>
              setFormData((prev) => ({
                ...prev,
                hiddenFields: !isHidden
                  ? prev.hiddenFields.concat('jabberPhone')
                  : prev.hiddenFields.filter((field) => field !== 'jabberPhone'),
              }))
            }
          />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`militaryDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.personalNumber')} value={contact.personalNumber} />
          <FieldDiv field={i18next.t('field.identityCard')} value={contact.identityCard} />
          <FieldDiv field={i18next.t('field.rank')} value={contact.rank} />
          <FieldDiv
            field={i18next.t('field.redPhone')}
            value={contact.redPhone?.toString()}
            isEdit={isEdit}
            onChange={(event) => setFormData((prev) => ({ ...prev, redPhone: event.target.value }))}
            isHidden={formData.hiddenFields?.includes('redPhone')}
            onHide={(isHidden) =>
              setFormData((prev) => ({
                ...prev,
                hiddenFields: !isHidden
                  ? prev.hiddenFields.concat('redPhone')
                  : prev.hiddenFields.filter((field) => field !== 'redPhone'),
              }))
            }
          />   
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
