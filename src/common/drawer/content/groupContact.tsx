import { Grid, Typography, useTheme } from '@mui/material';
import i18next from 'i18next';
import { FieldDiv } from '../../divs/field';
import { UpperContact } from './upperSection';
import { StyledDivider, StyledGridInfo, StyledGridSection } from './divider';
import { DirectEntities } from './directEntities';
import { DirectGroups } from './directGroups';
import { useQuery } from '@tanstack/react-query';
import { getSubsOfGroup } from '../../../services/searchService';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

export const GroupContactDrawer: React.FC<{ isEdit: boolean }> = ({ isEdit }) => {
  const theme = useTheme();
  const { contact } = useSelector((state: RootState) => state.drawer);

  const subs = useQuery({
    queryKey: ['subs', contact?.id],
    queryFn: () => getSubsOfGroup({ groupId: contact.id }),
    initialData: { entities: [], groups: [] },
    enabled: !!contact?.id,
  });

  const { entities, groups } = subs.data;

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, width: '100%' }}>
      <UpperContact
        contact={contact}
        isEdit={isEdit}
        title={contact.name}
        subTitle={contact.entitiesCount === 1 ? 'איש 1' : `${contact.entitiesCount ?? 0} ${i18next.t('people')}`}
        imageSize="3rem"
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

      {entities.length ? (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">משרתים</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectEntities
                entities={[
                  ...entities.sort((a, b) => {
                    const aIncludes = a.commanderOf?.includes(contact.id) ? 1 : 0;
                    const bIncludes = b.commanderOf?.includes(contact.id) ? 1 : 0;
                    if (bIncludes - aIncludes !== 0) return bIncludes - aIncludes;
                    return a.fullName.localeCompare(b.fullName);
                  }),
                ]}
              />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      ) : (
        <></>
      )}

      {groups.length ? (
        <>
          <StyledDivider theme={theme} />
          <StyledGridSection container theme={theme} margin={0}>
            <Typography variant="body1">תתי היררכיות</Typography>
            <StyledGridInfo container theme={theme}>
              <DirectGroups groups={[...groups.sort((a, b) => a.name.localeCompare(b.name))]} />
            </StyledGridInfo>
          </StyledGridSection>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
};
