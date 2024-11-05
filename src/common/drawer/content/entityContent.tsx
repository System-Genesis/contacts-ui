import { Typography, useTheme, Grid } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const EntityContentDrawer: React.FC<{ isEdit: boolean }> = ({ isEdit }) => {
  const theme = useTheme();
  const contact = useSelector((state: RootState) => state.drawer.contact);

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <UpperContact contact={contact} isEdit={isEdit} title={contact.fullName} subTitle={contact.jobTitle} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`role`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
          <FieldDiv field={i18next.t('field.uniqueId')} value={contact.adfsId?.split('@')[0]} />
          <FieldDiv field={i18next.t('field.mail')} value={contact.mail?.split('@')[0]} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`personalDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.mobilePhone')} value={contact.mobilePhone?.toString()} />
          <FieldDiv
            field={i18next.t('field.birthDate')}
            value={contact.birthDate ? new Date(contact.birthDate?.toString()).toLocaleDateString('en-GB') : undefined}
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
          <FieldDiv field={i18next.t('field.redPhone')} value={contact.redPhone?.toString()} />
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
