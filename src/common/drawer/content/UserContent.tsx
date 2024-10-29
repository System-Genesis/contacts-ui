import { Typography, useTheme, Grid } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './UpperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './Divider';

export const UserContent = ({ isEdit, object }) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <UpperContact object={object} isEdit={isEdit} title={object.fullName} subTitle={object.jobTitle} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`role`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')}  value={object.hierarchy} />
          <FieldDiv field={i18next.t('field.uniqueId')} value={object.adfsId?.split('@')[0]} />
          <FieldDiv field={i18next.t('field.mail')} value={object.mail?.split('@')[0]} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`personalDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.mobilePhone')} value={object.mobilePhone?.toString()} />
          <FieldDiv field={i18next.t('field.birthDate')} value={object.birthDate?.toString()} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t(`militaryDetails`)}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.personalNumber')} value={object.personalNumber} />
          <FieldDiv field={i18next.t('field.identityCard')} value={object.identityCard} />
          <FieldDiv field={i18next.t('field.rank')} value={object.rank} />
          <FieldDiv field={i18next.t('field.redPhone')} value={object.redPhone?.toString()} />
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
