import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './UpperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './Divider';
import { DirectEntities } from './DirectEntities';

export const GroupContact: React.FC<{ isEdit: boolean; object: any }> = ({ isEdit, object }) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, width: '100%' }}>
      <UpperContact
        object={object}
        isEdit={isEdit}
        title={object.name}
        subTitle={object.entitiesCount === 1 ? 'איש 1' : `${object.entitiesCount ?? 0} ${i18next.t('people')}`}
      />
      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('description')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('field.hierarchy')} value={object.hierarchy} />
        </StyledGridInfo>
      </StyledGridSection>

      <StyledDivider theme={theme} />

      <StyledGridSection container theme={theme}>
        <Typography variant="body1">{i18next.t('contactDetails')}</Typography>
        <StyledGridInfo container theme={theme}>
          <FieldDiv field={i18next.t('redPhone')} value={object.jabberPhone} />
          <FieldDiv field={i18next.t('anotherPhone')} value={object.anotherPhone} />
          <FieldDiv field={i18next.t('mail')} value={object.mail} />
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
