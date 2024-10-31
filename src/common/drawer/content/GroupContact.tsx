import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './UpperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './Divider';
import { DirectEntities } from './DirectEntities';

export const GroupContactCard: React.FC<{ isEdit: boolean; contact: object }> = ({ isEdit, contact }) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, width: '100%' }}>
      <UpperContact
        contact={contact}
        isEdit={isEdit}
        title={contact.name}
        subTitle={contact.entitiesCount === 1 ? 'איש 1' : `${contact.entitiesCount ?? 0} ${i18next.t('people')}`}
      />
      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('description')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={contact.hierarchy} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('redPhone')} value={contact.jabberPhone} />
          <FieldDiv field={i18next.t('anotherPhone')} value={contact.anotherPhone} />
          <FieldDiv field={i18next.t('mail')} value={contact.mail} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme} margin={0}>
        <Typography variant="body1">משרתים</Typography>
        <StyledGridInfo container theme={theme}>
          <DirectEntities
            entities={[
              { fullName: 'name', jobTitle: 'job' } as any,
              { fullName: 'name', jobTitle: 'job' } as any,
              { fullName: 'name', jobTitle: 'job' } as any,
              { fullName: 'name', jobTitle: 'job' } as any,
            ]}
          />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme} minHeight={'120px'} maxHeight={'120px'}>
        <Typography variant="body1">תתי היררכיות</Typography>
        <StyledGridInfo container theme={theme}></StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
