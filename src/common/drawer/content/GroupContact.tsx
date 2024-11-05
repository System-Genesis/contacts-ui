import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { DirectEntities } from './directEntities';
import { DirectGroups } from './directGroups';

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

      <StyledGridSection container theme={theme} margin={0}>
        <Typography variant="body1">תתי היררכיות</Typography>
        <StyledGridInfo container theme={theme}>
          <DirectGroups
            groups={[
              { name: 'name', entitiesCount: '20' } as any,
              { name: 'name', entitiesCount: '20' } as any,
              { name: 'name', entitiesCount: '20' } as any,
            ]}
          />
        </StyledGridInfo>
      </StyledGridSection>
    </Grid>
  );
};
